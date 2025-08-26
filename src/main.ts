import * as core from '@actions/core'
import { TsScoutService } from '@early/ts-scout'
import { GitHubService } from './services/github/github.service.js'
import { CoverageAnalysisService } from './services/coverage/coverage.service.js'
import { ConfigService } from './services/config/config.service.js'
import type { TestableFilterConfig } from './services/coverage/coverage.types.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Initialize configuration service
    const configService = new ConfigService()
    const config = await configService.getConfig()

    // Log configuration validation results
    if (!configService.isValid()) {
      const errors = configService.getValidationErrors()
      core.error(`Configuration validation issues: ${errors.join(', ')}`)
      core.setFailed('Configuration validation failed')
      return
    }

    // Get GitHub token from inputs or environment
    const githubToken = core.getInput('githubToken') || process.env.GITHUB_TOKEN
    if (!githubToken) {
      core.warning('No GitHub token provided, skipping PR file analysis')
    }

    // Initialize services
    const scoutService = new TsScoutService()
    const coverageAnalysisService = new CoverageAnalysisService()

    // Generate coverage data
    await scoutService.generateCoverage()
    const coverageTree = await scoutService.getCoverageTree()

    if (!coverageTree) {
      throw new Error('Failed to generate coverage tree')
    }

    // Initialize GitHub service if token is available
    let githubService: GitHubService | null = null
    if (githubToken) {
      try {
        githubService = new GitHubService(githubToken)

        // Check if running in PR context and get changed files
        if (githubService.isPullRequestContext()) {
          const prNumber = githubService.getPullRequestNumber()
          core.info(`Running in pull request context: #${prNumber}`)

          const changedFilesResult = await githubService.getChangedFiles()
          core.info(
            `Found ${changedFilesResult.totalProcessed} changed files, ${changedFilesResult.filteredCount} relevant files`
          )

          // Set basic outputs for other workflow steps
          core.setOutput(
            'changed-files-count',
            changedFilesResult.filteredCount.toString()
          )
          core.setOutput(
            'total-files-count',
            changedFilesResult.totalProcessed.toString()
          )
          core.setOutput('changed-files', changedFilesResult.files.join(','))

          // Analyze coverage for changed files
          const filterConfig: TestableFilterConfig = {
            coverageThreshold: config.coverageThreshold,
            includeNullCoverage: true,
            includeZeroCoverage: true
          }

          const filteredTestablesResult =
            await coverageAnalysisService.analyzeChangedFiles(
              coverageTree,
              changedFilesResult.files,
              filterConfig
            )

          // Set coverage analysis outputs
          core.setOutput(
            'low-coverage-testables-count',
            filteredTestablesResult.filteredCount.toString()
          )
          core.setOutput(
            'total-testables-analyzed',
            filteredTestablesResult.totalAnalyzed.toString()
          )
          core.setOutput(
            'files-with-coverage',
            filteredTestablesResult.filesWithCoverage.toString()
          )
          core.setOutput(
            'files-without-coverage',
            filteredTestablesResult.filesWithoutCoverage.toString()
          )

          // Set detailed testables output (JSON format for complex data)
          core.setOutput(
            'low-coverage-testables',
            JSON.stringify(filteredTestablesResult.testables)
          )

          // Log the changed files for debugging
          core.debug(
            `Changed files: ${JSON.stringify(changedFilesResult.files, null, 2)}`
          )
          core.debug(
            `Coverage analysis: ${JSON.stringify(filteredTestablesResult, null, 2)}`
          )
        } else {
          core.info(
            'Not running in pull request context, skipping file analysis'
          )
        }
      } catch (error) {
        core.warning(
          `Failed to analyze PR files: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
        // Continue with the action even if PR analysis fails
      }
    }

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
