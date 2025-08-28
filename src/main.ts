import * as core from '@actions/core'
import { TsScoutService } from '@earlyai/ts-scout'
import { CoverageAnalysisService } from './services/coverage-analysis/coverage-analysis.service.js'
import { ConfigService } from './services/config/config.service.js'
import { ChangedFilesService } from './services/github/changed-files.service.js'
import type { TestableFilterConfig } from './services/coverage-analysis/coverage-analysis.types.js'

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
      throw new Error("GITHUB_TOKEN is required but not set");
    }

    // Initialize services
    const scoutService = new TsScoutService()
    const coverageAnalysisService = new CoverageAnalysisService()
    const changedFilesService = new ChangedFilesService()

    // Generate coverage data
    await scoutService.generateCoverage()
    const coverageTree = await scoutService.getCoverageTree()
    core.debug(JSON.stringify(coverageTree, null, 2))

    if (!coverageTree) {
      throw new Error('Failed to generate coverage tree')
    }

    // Get changed files from PR if token is available
    if (githubToken) {
      const changedFilesResult =
        await changedFilesService.getChangedFilesFromPR(githubToken)

      if (changedFilesResult.success && changedFilesResult.data) {
        const { data: changedFilesData, isMock } = changedFilesResult

        // Log whether mock data was used
        if (isMock) {
          core.info('Using mock data for changed files analysis')
        }

        // Set basic outputs for other workflow steps
        core.setOutput(
          'changed-files-count',
          changedFilesData.filteredCount.toString()
        )
        core.setOutput(
          'total-files-count',
          changedFilesData.totalProcessed.toString()
        )
        core.setOutput('changed-files', changedFilesData.files.join(','))

        // Set mock indicator output
        core.setOutput('is-mock-data', isMock.toString())

        // Analyze coverage for changed files
        const filterConfig: TestableFilterConfig = {
          coverageThreshold: config.coverageThreshold,
          includeNullCoverage: true,
          includeZeroCoverage: true
        }

        const filteredTestablesResult =
          await coverageAnalysisService.analyzeChangedFiles(
            coverageTree,
            changedFilesData.files,
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

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
