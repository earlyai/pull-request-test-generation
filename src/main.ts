import * as core from '@actions/core'
import { TsScoutService } from '@earlyai/ts-scout'
import { ApiService } from './services/api/api.service.js'
import { CoverageAnalysisService } from './services/coverage-analysis/coverage-analysis.service.js'
import { ConfigService } from './services/config/config.service.js'
import { ChangedFilesService } from './services/github/changed-files.service.js'
import { GitService } from './services/git/git.service.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Initialize configuration service
    const configService = ConfigService.getInstance()
    const config = configService.getConfig()

    // Get GitHub token from inputs or environment
    const githubToken = core.getInput('githubToken') || process.env.GITHUB_TOKEN
    if (!githubToken) {
      throw new Error('GITHUB_TOKEN is required but not set')
    }

    // Initialize services
    const apiService = new ApiService(configService)
    const gitService = new GitService()
    const scoutService = new TsScoutService()
    const coverageAnalysisService = new CoverageAnalysisService()
    const changedFilesService = new ChangedFilesService()

    // Authenticate with the API
    try {
      await apiService.login()
      core.info('Successfully authenticated with the API')
    } catch (error) {
      core.warning(
        'Failed to authenticate with the API: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      )
      // Continue execution even if login fails
    }

    // Get Git information and log start of operation
    let workflowRunId: string | undefined
    try {
      const gitInfo = await gitService.getGitInfo()
      workflowRunId = await apiService.logStartOperation(gitInfo)
      core.info('Successfully logged workflow start')
    } catch (error) {
      core.warning(
        `Failed to log workflow start: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      // Action continues regardless
    }

    // Generate coverage data
    await scoutService.generateCoverage()
    const coverageTree = await scoutService.getCoverageTree()
    core.debug(JSON.stringify(coverageTree, null, 2))

    if (!coverageTree) {
      throw new Error('Failed to generate coverage tree')
    }

    // Set pre-coverage output
    core.setOutput('pre-coverage', coverageTree['/']?.percentage)

    // Get changed files from PR if token is available
    if (githubToken) {
      const changedFilesResult =
        await changedFilesService.getChangedFilesFromPR(githubToken)

      if (changedFilesResult.success && changedFilesResult.data) {
        const { data: changedFilesData } = changedFilesResult

        // Analyze coverage for changed files
        const filteredTestablesResult =
          await coverageAnalysisService.analyzeChangedFiles(
            coverageTree,
            changedFilesData.files,
            {
              coverageThreshold: config.coverageThreshold
            }
          )

        await scoutService.generateCoverage()
        const postCoverageTree = await scoutService.getCoverageTree()
        if (!postCoverageTree) {
          throw new Error('Failed to generate coverage tree')
        }
        // Set post-coverage output
        core.setOutput('post-coverage', postCoverageTree['/']?.percentage)

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
    }

    // Log end of operation if we have a workflow run ID
    if (workflowRunId) {
      try {
        await apiService.logEndOperation(workflowRunId)
        core.info('Successfully logged workflow end')
      } catch (error) {
        core.warning(
          `Failed to log workflow end: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
        // Action continues regardless
      }
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
