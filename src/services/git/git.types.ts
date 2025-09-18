/**
 * Types and interfaces for the Git service
 */

/**
 * Git repository information
 */
export interface GitInfo {
  /** The branch, tag, or commit reference name */
  readonly ref_name: string;
  /** The repository name */
  readonly repository: string;
  /** The repository owner/organization */
  readonly owner: string;
  /** The current commit SHA */
  readonly sha: string;
}

/**
 * Git service interface
 */
export interface IGitService {
  /**
   * Gets Git information from the local repository
   * @returns Promise resolving to Git information
   */
  getGitInfo(): Promise<GitInfo>;
}

/**
 * Result of committing files
 */
export interface CommitResult {
  /** List of file paths that were committed */
  readonly committedFiles: readonly string[];
  /** Error message if an error occurred, empty string if successful */
  readonly error: string;
}
