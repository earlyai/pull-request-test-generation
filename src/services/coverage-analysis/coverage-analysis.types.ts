/**
 * Types and interfaces for the coverage analysis service
 */

import { CoverageReport } from "@earlyai/ts-agent";

/**
 * Represents a filtered testable with additional context
 */
export interface FilteredTestable {
  /** The name of the testable item */
  readonly name: string;
  /** The coverage percentage */
  readonly percentage: number | null;
  /** The file path where this testable is located */
  readonly filePath: string;
  /** The reason why this testable was filtered (for debugging) */
  readonly reason: "no-coverage" | "zero-coverage" | "below-threshold";
}

/**
 * Result of filtering testables based on coverage threshold
 */
export interface FilteredTestablesResult {
  /** Array of filtered testables */
  readonly testables: readonly FilteredTestable[];
  /** Total number of testables analyzed */
  readonly totalAnalyzed: number;
  /** Number of testables that met the filtering criteria */
  readonly filteredCount: number;
  /** Number of changed files that had coverage data in tree */
  readonly filesWithCoverage: number;
  /** Number of changed files without coverage data in tree */
  readonly filesWithoutCoverage: number;
}

/**
 * Configuration for testable filtering
 */
export interface TestableFilterConfig {
  /** Coverage threshold percentage (0-100) */
  readonly coverageThreshold: number;
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
    coverageTree: CoverageReport,
    changedFiles: readonly string[],
    filterConfig: TestableFilterConfig,
  ): Promise<FilteredTestablesResult>;
}

/**
 * Default testable filter configuration
 */
export const DEFAULT_TESTABLE_FILTER_CONFIG: Required<TestableFilterConfig> = {
  coverageThreshold: 0,
} as const;
