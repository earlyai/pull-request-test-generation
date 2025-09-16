/**
 * Types and interfaces for the GitHub service
 */

/**
 * Represents a file change in a pull request
 */
export interface ChangedFile {
  /** The path of the changed file */
  readonly path: string;
  /** The status of the file change (added, modified, removed, renamed) */
  readonly status: "added" | "modified" | "removed" | "renamed";
  /** The SHA of the file */
  readonly sha: string;
  /** The filename */
  readonly filename: string;
}

/**
 * Result of filtering changed files
 */
export interface FilteredFilesResult {
  /** Array of filtered file paths */
  readonly files: readonly string[];
  /* total number of added, modified, and changed files */
  readonly totalProcessed: number;
  /** total number of testable candidates files (ts/js and not test files) */
  readonly filteredCount: number;
}

/**
 * Configuration for file filtering
 */
export interface FileFilterConfig {
  /** File extensions to include */
  readonly allowedExtensions: readonly string[];
  /** Patterns to exclude (e.g., test files) */
  readonly excludePatterns: readonly string[];
}

/**
 * GitHub service interface for pull request operations
 */
export interface IGitHubService {
  /**
   * Checks if the current workflow is running in a pull request context
   * @returns True if running in PR context, false otherwise
   */
  isPullRequestContext(): boolean;

  /**
   * Retrieves and filters changed files in the current pull request
   * @param filterConfig Optional configuration for file filtering
   * @returns Promise resolving to filtered files result
   */
  getChangedFiles(filterConfig?: Partial<FileFilterConfig>): Promise<FilteredFilesResult>;

  /**
   * Gets the pull request number if in PR context
   * @returns Pull request number or null if not in PR context
   */
  getPullRequestNumber(): number | null;

  /**
   * Adds a comment to the current pull request
   * @param content The markdown content to post as a comment
   * @returns Promise that resolves when comment is posted
   */
  addPRComment(content: string): Promise<void>;
}

/**
 * Default file filter configuration
 */
export const DEFAULT_FILE_FILTER_CONFIG: FileFilterConfig = {
  allowedExtensions: [".ts", ".tsx", ".js", ".jsx"],
  excludePatterns: [".test.", ".spec."],
} as const;
