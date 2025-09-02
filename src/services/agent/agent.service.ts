import { injectable, inject } from 'inversify'
import * as core from '@actions/core'
import { ConfigService } from '../config/config.service.js'
import { ApiService } from '../api/api.service.js'
import { GitService } from '../git/git.service.js'
import { CoverageAnalysisService } from '../coverage-analysis/coverage-analysis.service.js'
import { ChangedFilesService } from '../github/changed-files.service.js'
import { TYPES } from '@/container.types.js'
import type { ITSScout } from '@/container.types.js'
import { GitHubService } from '../github/github.service.js'

/**
 * Agent service that orchestrates all other services and implements business flows
 */
@injectable()
export class AgentService {
  constructor(
    @inject(ConfigService) private readonly configService: ConfigService,
    @inject(ApiService) private readonly apiService: ApiService,
    @inject(GitService) private readonly gitService: GitService,
    @inject(CoverageAnalysisService)
    private readonly coverageAnalysisService: CoverageAnalysisService,
    @inject(ChangedFilesService)
    private readonly changedFilesService: ChangedFilesService,
    @inject(GitHubService) private readonly githubService: GitHubService,
    @inject(TYPES.TsScoutService) private readonly scoutService: ITSScout
  ) {}

  /**
   * Main entry point for the agent - orchestrates the complete PR context flow
   */
  public async runPRContextFlow(): Promise<void> {
    try {
      // Step 1: Login and log start
      await this.loginAndLogStart()

      // Step 2: Generate initial coverage
      await this.generateInitialCoverage()

      // Step 3: Get changed files from PR and analyze
      await this.analyzeChangedFiles()

      // Step 4: TODO: Generate tests (not implemented yet in ts-scout)
      await this.generateTests()

      // Step 5: Run coverage again and log results
      await this.generateFinalCoverageAndLog()
    } catch (error) {
      core.error(
        `Agent flow failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      throw error
    } finally {
      // Always log end of operation
      await this.logEndOperation()
    }
  }

  /**
   * Authenticates with the API and logs the start of operation
   */
  private async loginAndLogStart(): Promise<void> {
    try {
      // Authenticate with the API
      await this.apiService.login()
      core.info('Successfully authenticated with the API')

      // Get Git information and log start of operation
      const gitInfo = await this.gitService.getGitInfo()
      const prNumber = this.githubService.getPullRequestNumber()
      if (prNumber) {
        const workflowRunId = await this.apiService.logStartOperation(gitInfo, {
          prNumber
        })
        core.info('Successfully logged workflow start')
        this.workflowRunId = workflowRunId
      } else {
        const workflowRunId = await this.apiService.logStartOperation(gitInfo)
        core.info('Successfully logged workflow start')
        this.workflowRunId = workflowRunId
      }
    } catch (error) {
      core.warning(
        'Failed to authenticate or log workflow start: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      )
      // Continue execution even if login fails
    }
  }

  /**
   * Generates initial coverage data
   */
  private async generateInitialCoverage(): Promise<void> {
    core.info('Generating initial coverage...')
    await this.scoutService.generateCoverage()
    const coverageTree = await this.scoutService.getCoverageTree()

    if (!coverageTree) {
      throw new Error('Failed to generate initial coverage tree')
    }

    // Store initial coverage for comparison
    this.initialCoverage = coverageTree['/']?.percentage ?? undefined
    core.setOutput('pre-coverage', this.initialCoverage)
    core.info(`Initial coverage: ${this.initialCoverage}%`)
  }

  /**
   * Analyzes changed files from PR and filters based on business logic
   */
  private async analyzeChangedFiles(): Promise<void> {
    const githubToken = core.getInput('token') || process.env.GITHUB_TOKEN
    if (!githubToken) {
      core.info('No GitHub token available, skipping changed files analysis')
      return
    }

    try {
      // Get changed files from PR
      const changedFilesResult =
        await this.changedFilesService.getChangedFilesFromPR()

      if (changedFilesResult.success && changedFilesResult.data) {
        const { data: changedFilesData } = changedFilesResult

        // Log PR context information
        core.info(`PR Context: PR #${changedFilesResult.prNumber}`)

        // Analyze coverage for changed files
        const config = this.configService.getConfig()
        const coverageTree = await this.scoutService.getCoverageTree()
        if (!coverageTree) {
          throw new Error('Failed to get coverage tree for analysis')
        }
        const filteredTestablesResult =
          await this.coverageAnalysisService.analyzeChangedFiles(
            coverageTree,
            changedFilesData.files,
            {
              coverageThreshold: config.coverageThreshold
            }
          )

        // Log the changed files for debugging
        core.debug(
          `Changed files: ${JSON.stringify(changedFilesData.files, null, 2)}`
        )
        core.debug(
          `Coverage analysis: ${JSON.stringify(filteredTestablesResult, null, 2)}`
        )
      } else {
        // Handle failure cases
        if (changedFilesResult.error) {
          if (
            changedFilesResult.error.includes(
              'Not running in pull request context'
            )
          ) {
            core.info(
              'Not running in pull request context, skipping file analysis'
            )
          } else {
            core.warning(
              `Failed to get changed files: ${changedFilesResult.error}`
            )
          }
        }
      }
    } catch (error) {
      core.warning(
        `Error analyzing changed files: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * TODO: Generate tests (not implemented yet in ts-scout)
   */
  private async generateTests(): Promise<void> {
    core.info('TODO: Generate tests - not implemented yet in ts-scout')
    // This will be implemented when ts-scout supports test generation
  }

  /**
   * Generates final coverage and logs the comparison
   */
  private async generateFinalCoverageAndLog(): Promise<void> {
    core.info('Generating final coverage...')
    await this.scoutService.generateCoverage()
    const postCoverageTree = await this.scoutService.getCoverageTree()

    if (!postCoverageTree) {
      throw new Error('Failed to generate final coverage tree')
    }

    // Set post-coverage output
    const finalCoverage = postCoverageTree['/']?.percentage
    core.setOutput('post-coverage', finalCoverage)

    // Log coverage comparison
    if (this.initialCoverage !== undefined) {
      core.info(
        `Coverage comparison: ${this.initialCoverage}% → ${finalCoverage}%`
      )
    } else {
      core.info(`Final coverage: ${finalCoverage}%`)
    }
  }

  /**
   * Logs the end of operation
   */
  private async logEndOperation(): Promise<void> {
    if (this.workflowRunId) {
      try {
        await this.apiService.logEndOperation(this.workflowRunId)
        core.info('Successfully logged workflow end')
      } catch (error) {
        core.warning(
          `Failed to log workflow end: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }
  }

  // Private properties to store state during the flow
  private workflowRunId: string | undefined
  private initialCoverage: number | undefined
}
