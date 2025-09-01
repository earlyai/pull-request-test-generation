import { injectable } from 'inversify'
import * as core from '@actions/core'
import type {
  ICoverageAnalysisService,
  FilteredTestablesResult,
  FilteredTestable,
  TestableFilterConfig
} from './coverage-analysis.types.js'
import { CoverageReport } from '@earlyai/ts-scout'
import { CoverageReaderFileReport } from '@earlyai/ts-scout/dist/services/test-framework/coverage/coverage.types.js'

/**
 * Service for analyzing coverage data and filtering testables based on coverage threshold
 */
@injectable()
export class CoverageAnalysisService implements ICoverageAnalysisService {
  /**
   * Analyzes changed files and filters testables based on coverage threshold
   * @param coverageTree The coverage tree data
   * @param changedFiles The list of changed file paths
   * @param filterConfig Configuration for filtering testables
   * @returns Promise resolving to filtered testables result
   */
  public async analyzeChangedFiles(
    coverageTree: CoverageReport,
    changedFiles: readonly string[],
    filterConfig: TestableFilterConfig
  ): Promise<FilteredTestablesResult> {
    try {
      core.info(
        `Analyzing coverage for ${changedFiles.length} changed files with threshold ${filterConfig.coverageThreshold}%`
      )

      const filteredTestables: FilteredTestable[] = []
      let totalAnalyzed = 0
      let filesWithCoverage = 0
      let filesWithoutCoverage = 0

      for (const filePath of changedFiles) {
        const normalizedPath = this.normalizeFilePath(filePath)
        const fileCoverage = this.findFileCoverage(coverageTree, normalizedPath)

        if (fileCoverage) {
          filesWithCoverage++
          const fileTestables = this.filterTestablesForFile(
            fileCoverage,
            filePath,
            filterConfig
          )
          filteredTestables.push(...fileTestables)
          totalAnalyzed += fileCoverage.testables?.length ?? 0

          if (fileTestables.length > 0) {
            core.debug(
              `File ${filePath}: ${fileTestables.length}/${fileCoverage.testables?.length ?? 0} testables below threshold`
            )
          }
        } else {
          filesWithoutCoverage++
          core.debug(`No coverage data found for file: ${filePath}`)
        }
      }

      const result: FilteredTestablesResult = {
        testables: filteredTestables,
        totalAnalyzed,
        filteredCount: filteredTestables.length,
        filesWithCoverage,
        filesWithoutCoverage
      }

      core.info(
        `Coverage analysis complete: ${result.filteredCount}/${result.totalAnalyzed} testables below threshold across ${result.filesWithCoverage} files`
      )

      if (result.filesWithoutCoverage > 0) {
        core.warning(
          `${result.filesWithoutCoverage} changed files have no coverage data`
        )
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        core.error(`Failed to analyze coverage: ${error.message}`)
        throw error
      }
      throw new Error('Unknown error occurred while analyzing coverage')
    }
  }

  /**
   * Normalizes file path for consistent matching with coverage tree
   * @param filePath The file path to normalize
   * @returns Normalized file path
   */
  private normalizeFilePath(filePath: string): string {
    // Remove leading slash if present and ensure consistent format
    return filePath.startsWith('/') ? filePath.slice(1) : filePath
  }

  /**
   * Finds coverage data for a file in the coverage tree
   * @param coverageTree The coverage tree to search
   * @param normalizedPath The normalized file path
   * @returns File coverage data or null if not found
   */
  private findFileCoverage(
    coverageTree: CoverageReport,
    normalizedPath: string
  ): CoverageReaderFileReport | null {
    // Try exact match first
    if (coverageTree[normalizedPath]) {
      return coverageTree[normalizedPath]
    }

    // Try with leading slash
    const withLeadingSlash = `/${normalizedPath}`
    if (coverageTree[withLeadingSlash]) {
      return coverageTree[withLeadingSlash]
    }

    // Try case-insensitive match
    for (const [key, value] of Object.entries(coverageTree)) {
      if (key.toLowerCase() === normalizedPath.toLowerCase()) {
        return value
      }
    }

    return null
  }

  /**
   * Filters testables for a specific file based on coverage criteria
   * @param fileCoverage The coverage data for the file
   * @param originalFilePath The original file path (for context)
   * @param filterConfig The filtering configuration
   * @returns Array of filtered testables
   */
  private filterTestablesForFile(
    fileCoverage: CoverageReaderFileReport,
    originalFilePath: string,
    filterConfig: TestableFilterConfig
  ): FilteredTestable[] {
    const filteredTestables: FilteredTestable[] = []

    for (const testable of fileCoverage.testables ?? []) {
      const shouldInclude = this.shouldIncludeTestable(testable, filterConfig)

      if (shouldInclude) {
        const reason = this.getFilterReason(testable)
        filteredTestables.push({
          name: testable.name,
          percentage: testable.percentage,
          filePath: originalFilePath,
          reason
        })
      }
    }

    return filteredTestables
  }

  /**
   * Determines if a testable should be included based on filtering criteria
   * @param testable The testable to evaluate
   * @param filterConfig The filtering configuration
   * @returns True if the testable should be included
   */
  private shouldIncludeTestable(
    testable: { percentage: number | null },
    filterConfig: TestableFilterConfig
  ): boolean {
    // Include testables with null coverage if configured
    if (testable.percentage === null) {
      return true
    }

    // Include testables with zero coverage if configured
    if (testable.percentage === 0) {
      return true
    }

    // Include testables below threshold
    if (
      testable.percentage !== null &&
      testable.percentage < filterConfig.coverageThreshold
    ) {
      return true
    }

    return false
  }

  /**
   * Gets the reason why a testable was filtered
   * @param testable The testable that was filtered
   * @returns The filter reason
   */
  private getFilterReason(testable: {
    percentage: number | null
  }): FilteredTestable['reason'] {
    if (testable.percentage === null) {
      return 'no-coverage'
    }

    if (testable.percentage === 0) {
      return 'zero-coverage'
    }

    return 'below-threshold'
  }
}
