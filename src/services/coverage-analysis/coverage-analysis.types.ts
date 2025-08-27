/**
 * Types and interfaces for the coverage analysis service
 */

/**
 * Represents a testable item with coverage information
 */
export interface Testable {
  /** The name of the testable item (function, method, etc.) */
  readonly name: string
  /** The coverage percentage (null if no coverage data available) */
  readonly percentage: number | null
}

/**
 * Represents coverage data for a file
 * This matches the actual structure returned by TsScoutService
 */
export interface FileCoverage {
  /** The coverage percentage for the entire file */
  readonly percentage: number | null
  /** Array of testable items in the file */
  readonly testables: readonly Testable[]
}

/**
 * Represents the complete coverage tree structure
 * This matches the actual structure returned by TsScoutService
 */
export interface CoverageTree {
  /** Coverage data keyed by file path */
  readonly [filePath: string]: FileCoverage
}

/**
 * Type for the coverage report that can be undefined
 */
export type CoverageReport = CoverageTree | undefined

/**
 * Represents a filtered testable with additional context
 */
export interface FilteredTestable {
  /** The name of the testable item */
  readonly name: string
  /** The coverage percentage */
  readonly percentage: number | null
  /** The file path where this testable is located */
  readonly filePath: string
  /** The reason why this testable was filtered (for debugging) */
  readonly reason: 'no-coverage' | 'zero-coverage' | 'below-threshold'
}

/**
 * Result of filtering testables based on coverage threshold
 */
export interface FilteredTestablesResult {
  /** Array of filtered testables */
  readonly testables: readonly FilteredTestable[]
  /** Total number of testables analyzed */
  readonly totalAnalyzed: number
  /** Number of testables that met the filtering criteria */
  readonly filteredCount: number
  /** Number of changed files that had coverage data */
  readonly filesWithCoverage: number
  /** Number of changed files without coverage data */
  readonly filesWithoutCoverage: number
}

/**
 * Configuration for testable filtering
 */
export interface TestableFilterConfig {
  /** Coverage threshold percentage (0-100) */
  readonly coverageThreshold: number
  /** Whether to include testables with null coverage */
  readonly includeNullCoverage: boolean
  /** Whether to include testables with zero coverage */
  readonly includeZeroCoverage: boolean
}

/**
 * Coverage analysis service interface
 */
export interface ICoverageAnalysisService {
  /**
   * Analyzes changed files and filters testables based on coverage threshold
   * @param coverageTree The coverage tree data
   * @param changedFiles The list of changed file paths
   * @param filterConfig Configuration for filtering testables
   * @returns Promise resolving to filtered testables result
   */
  analyzeChangedFiles(
    coverageTree: any,
    changedFiles: readonly string[],
    filterConfig: TestableFilterConfig
  ): Promise<FilteredTestablesResult>
}

/**
 * Default testable filter configuration
 */
export const DEFAULT_TESTABLE_FILTER_CONFIG: TestableFilterConfig = {
  coverageThreshold: 0,
  includeNullCoverage: true,
  includeZeroCoverage: true
} as const
