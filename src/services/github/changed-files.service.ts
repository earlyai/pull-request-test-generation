import { inject, injectable } from "inversify";

import * as core from "@actions/core";
import { isDefined } from "@earlyai/core";

import { GitHubService } from "./github.service.js";
import type { FilteredFilesResult } from "./github.types.js";
/**
 * Result of getting changed files from PR
 */
export interface ChangedFilesResult {
  /** Whether the operation was successful */
  readonly success: boolean;
  /** The filtered files result if successful */
  readonly data?: FilteredFilesResult;
  /** Error message if operation failed */
  readonly error?: string;
  /** Whether mock data was used */
  readonly isMock: boolean;
  /** PR number if in PR context */
  readonly prNumber?: number;
}

/**
 * Service for retrieving changed files from pull requests with mock support
 */
@injectable()
export class ChangedFilesService {
  constructor(@inject(GitHubService) private readonly githubService: GitHubService) {}

  /**
   * Gets changed files from the current pull request
   * @returns Promise resolving to changed files result
   */
  public async getChangedFilesFromPR(): Promise<ChangedFilesResult> {
    try {
      if (this.shouldUseMockData()) {
        core.info("Using mock data for changed files (ACTIONS_STEP_DEBUG=true)");

        return this.getMockChangedFiles();
      }

      // Check if running in PR context
      if (!this.githubService.isPullRequestContext()) {
        return {
          success: false,
          error: "Not running in pull request context",
          isMock: false,
        };
      }

      // Get PR number and changed files
      const prNumber = this.githubService.getPullRequestNumber();

      if (!isDefined(prNumber)) {
        return {
          success: false,
          error: "Unable to determine pull request number",
          isMock: false,
        };
      }

      core.info(`Running in pull request context: #${prNumber}`);

      const changedFilesResult = await this.githubService.getChangedFiles();

      core.info(
        `Found ${changedFilesResult.totalProcessed} changed files, ${changedFilesResult.filteredCount} relevant files`,
      );

      return {
        success: true,
        data: changedFilesResult,
        isMock: false,
        prNumber,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      core.warning(`Failed to get changed files: ${errorMessage}`);

      return {
        success: false,
        error: errorMessage,
        isMock: false,
      };
    }
  }

  /**
   * Checks if mock data should be used based on environment variables
   * @returns True if mock data should be used
   */
  private shouldUseMockData(): boolean {
    return process.env.ACTIONS_STEP_DEBUG === "true";
  }

  /**
   * Gets mock changed files data for debugging
   * @returns Mock changed files result
   */
  private getMockChangedFiles(): ChangedFilesResult {
    const mockFiles = [
      "src/main.ts",
      "src/services/config/config.service.ts",
      //   'src/services/coverage/coverage.service.ts',
      //   'src/services/github/github.service.ts',
      //   'package.json',
      //   'README.md',
      //   'tests/main.test.ts',
      //   'docs/api.md'
    ];

    const mockResult: FilteredFilesResult = {
      files: mockFiles,
      totalProcessed: mockFiles.length,
      filteredCount: mockFiles.length,
    };

    core.debug(`Mock changed files: ${JSON.stringify(mockResult, null, 2)}`);

    return {
      success: true,
      data: mockResult,
      isMock: true,
      prNumber: 123, // Mock PR number
    };
  }
}
