import * as core from '@actions/core'
import * as github from '@actions/github'
import type {
  IGitHubService,
  FilteredFilesResult,
  FileFilterConfig,
  ChangedFile
} from './github.types.js'
import { DEFAULT_FILE_FILTER_CONFIG } from './github.types.js'

/**
 * GitHub service for pull request operations
 * Handles context detection, file retrieval, and filtering
 */
export class GitHubService implements IGitHubService {
  private readonly octokit: ReturnType<typeof github.getOctokit>
  private readonly context: typeof github.context

  /**
   * Creates a new GitHub service instance
   * @param token GitHub token for authentication
   */
  public constructor(token: string) {
    this.octokit = github.getOctokit(token)
    this.context = github.context
  }

  /**
   * Checks if the current workflow is running in a pull request context
   * @returns True if running in PR context, false otherwise
   */
  public isPullRequestContext(): boolean {
    return this.context.eventName === 'pull_request'
  }

  /**
   * Gets the pull request number if in PR context
   * @returns Pull request number or null if not in PR context
   */
  public getPullRequestNumber(): number | null {
    if (!this.isPullRequestContext()) {
      return null
    }

    const prNumber = this.context.payload.pull_request?.number
    return typeof prNumber === 'number' ? prNumber : null
  }

  /**
   * Retrieves and filters changed files in the current pull request
   * @param filterConfig Optional configuration for file filtering
   * @returns Promise resolving to filtered files result
   */
  public async getChangedFiles(
    filterConfig?: Partial<FileFilterConfig>
  ): Promise<FilteredFilesResult> {
    try {
      if (!this.isPullRequestContext()) {
        throw new Error('Not running in pull request context')
      }

      const prNumber = this.getPullRequestNumber()
      if (!prNumber) {
        throw new Error('Unable to determine pull request number')
      }

      core.info(`Retrieving changed files for pull request #${prNumber}`)

      const changedFiles = await this.retrieveChangedFiles(prNumber)
      const filteredFiles = this.filterFiles(changedFiles, filterConfig)

      const result: FilteredFilesResult = {
        files: filteredFiles,
        totalProcessed: changedFiles.length,
        filteredCount: filteredFiles.length
      }

      core.info(
        `Processed ${result.totalProcessed} changed files, filtered to ${result.filteredCount} relevant files`
      )

      return result
    } catch (error) {
      if (error instanceof Error) {
        core.error(`Failed to get changed files: ${error.message}`)
        throw error
      }
      throw new Error('Unknown error occurred while getting changed files')
    }
  }

  /**
   * Retrieves the list of changed files from the GitHub API
   * @param prNumber The pull request number
   * @returns Promise resolving to array of changed files
   */
  private async retrieveChangedFiles(prNumber: number): Promise<ChangedFile[]> {
    try {
      const response = await this.octokit.rest.pulls.listFiles({
        owner: this.context.repo.owner,
        repo: this.context.repo.repo,
        pull_number: prNumber,
        per_page: 100 // Maximum allowed by GitHub API
      })

      if (response.status !== 200) {
        throw new Error(`GitHub API returned status ${response.status}`)
      }

      return response.data.map((file) => ({
        path: file.filename,
        status: file.status as ChangedFile['status'],
        sha: file.sha,
        filename: file.filename.split('/').pop() || file.filename
      }))
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          core.warning(
            'GitHub API rate limit exceeded, consider using a token with higher limits'
          )
        }
        throw new Error(`Failed to retrieve changed files: ${error.message}`)
      }
      throw new Error('Unknown error occurred while retrieving changed files')
    }
  }

  /**
   * Filters the changed files based on the provided configuration
   * @param changedFiles Array of changed files to filter
   * @param filterConfig Optional configuration for file filtering
   * @returns Array of filtered file paths
   */
  private filterFiles(
    changedFiles: ChangedFile[],
    filterConfig?: Partial<FileFilterConfig>
  ): string[] {
    const config = { ...DEFAULT_FILE_FILTER_CONFIG, ...filterConfig }

    return changedFiles
      .filter((file) => {
        // Check if file has allowed extension
        const hasAllowedExtension = config.allowedExtensions.some((ext) =>
          file.path.toLowerCase().endsWith(ext)
        )

        if (!hasAllowedExtension) {
          return false
        }

        // Check if file should be excluded based on patterns
        const shouldExclude = config.excludePatterns.some((pattern) =>
          file.path.toLowerCase().includes(pattern.toLowerCase())
        )

        return !shouldExclude
      })
      .map((file) => file.path)
  }
}
