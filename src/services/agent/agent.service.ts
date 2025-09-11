import { inject, injectable } from "inversify";

import * as core from "@actions/core";
import { isDefined, isEmpty } from "@earlyai/core";
import { CoverageReport, SerializedTestable } from "@earlyai/ts-agent";

import type { ITSAgent } from "@/container.types.js";
import { TYPES } from "@/container.types.js";

import { ApiService } from "../api/api.service.js";
import { ConfigService } from "../config/config.service.js";
import { CoverageAnalysisService } from "../coverage-analysis/coverage-analysis.service.js";
import { FilteredTestable, FilteredTestablesResult } from "../coverage-analysis/coverage-analysis.types.js";
import { GitService } from "../git/git.service.js";
import { ChangedFilesResult, ChangedFilesService } from "../github/changed-files.service.js";
import { GitHubService } from "../github/github.service.js";

/**
 * Agent service that orchestrates all other services and implements business flows
 */
@injectable()
export class AgentService {
  constructor(
    @inject(ConfigService) private readonly configService: ConfigService,
    @inject(ApiService) private readonly apiService: ApiService,
    @inject(GitService) private readonly gitService: GitService,
    @inject(CoverageAnalysisService)
    private readonly coverageAnalysisService: CoverageAnalysisService,
    @inject(ChangedFilesService)
    private readonly changedFilesService: ChangedFilesService,
    @inject(GitHubService) private readonly githubService: GitHubService,
    @inject(TYPES.TSAgent) private readonly tsAgent: ITSAgent,
  ) {}

  /**
   * Main entry point for the agent - orchestrates the complete PR context flow
   */
  public async runPRContextFlow(): Promise<void> {
    try {
      // Step 1: Login and log start
      await this.loginAndLogStart();

      // Step 2: Generate initial coverage
      await this.generateInitialCoverage();

      // Step 3: Get changed files from PR and analyze
      const filteredTestablesResult = await this.analyzeChangedFiles();

      if (isEmpty(filteredTestablesResult)) {
        core.warning("No filtered testables result");

        return;
      } else {
        core.info(`Filtered testables result count: ${filteredTestablesResult.length}`);
      }
      // Step 4: Generate tests
      await this.generateTests(filteredTestablesResult);

      // Step 5: Commit files (if auto-commit is enabled)
      if (this.configService.getConfigValue("autoCommit")) {
        const refName = this.githubService.getRefName();

        await this.gitService.commitFiles(refName);
      } else {
        core.info("Auto-commit is disabled - skipping commit step");
      }

      // Step 6: Run coverage again and log results
      await this.generateFinalCoverageAndLog();
    } catch (error) {
      core.error(`Agent flow failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    } finally {
      // Always log end of operation
      await this.logEndOperation();
    }
  }

  /**
   * Authenticates with the API and logs the start of operation
   */
  private async loginAndLogStart(): Promise<void> {
    try {
      // Authenticate with the API
      await this.apiService.login();
      core.info("Successfully authenticated with the API");

      // Get Git information and log start of operation
      const gitInfo = await this.gitService.getGitInfo();
      const prNumber = this.githubService.getPullRequestNumber();

      try {
        if (isDefined(prNumber)) {
          const workflowRunId = await this.apiService.logStartOperation(gitInfo, {
            prNumber,
          });

          this.workflowRunId = workflowRunId;
        } else {
          const workflowRunId = await this.apiService.logStartOperation(gitInfo);

          this.workflowRunId = workflowRunId;
        }
      } catch {}
    } catch (error) {
      core.warning("Failed to authenticate:" + (error instanceof Error ? error.message : "Unknown error"));
      // Continue execution even if login fails
    }
  }

  /**
   * Generates initial coverage data
   */
  private async generateInitialCoverage(): Promise<void> {
    core.info("Generating initial coverage...");
    await this.tsAgent.generateCoverage();
    const coverageTree = await this.tsAgent.getCoverageTree();

    if (!coverageTree) {
      throw new Error("Failed to generate initial coverage tree");
    }

    // Store initial coverage for comparison
    this.initialCoverage = coverageTree["/"]?.percentage ?? undefined;
    core.setOutput("pre-coverage", this.initialCoverage);
    core.setOutput("post-coverage", this.initialCoverage);
    core.info(`Initial coverage: ${this.initialCoverage}%`);
  }

  /**
   * Analyzes changed files from PR and filters based on business logic
   */
  private async analyzeChangedFiles(): Promise<
    {
      filePath: string;
      testable: SerializedTestable;
    }[]
  > {
    try {
      const changedFilesResult = await this.getChangedFilesFromPR();

      if (!changedFilesResult.success || !isDefined(changedFilesResult.data)) {
        this.handleChangedFilesFailure(changedFilesResult);

        return [];
      }

      const { data: changedFilesData } = changedFilesResult;
      const { filteredTestables } = await this.analyzeCoverageForChangedFiles(changedFilesData.files);

      const allTestables = await this.collectTestablesForFiles(changedFilesData.files);
      const filteredTestablesMap = this.createFilteredTestablesMap(filteredTestables.testables);

      const config = this.configService.getConfig();

      return this.filterAndLimitResults(allTestables, filteredTestablesMap, config.maxTestables);
    } catch (error) {
      core.warning(`Error analyzing changed files: ${error instanceof Error ? error.message : "Unknown error"}`);

      return [];
    }
  }

  /**
   * Gets changed files from PR using the changed files service
   */
  private async getChangedFilesFromPR(): Promise<ChangedFilesResult> {
    return await this.changedFilesService.getChangedFilesFromPR();
  }

  /**
   * Analyzes coverage for changed files and returns filtered testables
   */
  private async analyzeCoverageForChangedFiles(changedFiles: readonly string[]): Promise<{
    coverageTree: CoverageReport;
    filteredTestables: FilteredTestablesResult;
  }> {
    const config = this.configService.getConfig();
    const coverageTree = await this.tsAgent.getCoverageTree();

    if (!isDefined(coverageTree)) {
      throw new Error("Failed to get coverage tree for analysis");
    }

    const filteredTestablesResult = await this.coverageAnalysisService.analyzeChangedFiles(coverageTree, changedFiles, {
      coverageThreshold: config.coverageThreshold,
    });

    return { coverageTree, filteredTestables: filteredTestablesResult };
  }

  /**
   * Collects testables for all changed files
   */
  private async collectTestablesForFiles(filePaths: readonly string[]): Promise<[string, SerializedTestable[]][]> {
    const uniqueFilePaths = new Set(filePaths);

    const testablePromises = [...uniqueFilePaths].map(async (filePath) => {
      core.debug(`Getting testables for file: ${filePath}`);
      const fileTestables = await this.tsAgent.getTestables(filePath);

      if (isEmpty(fileTestables)) {
        return;
      }

      return fileTestables[0];
    });

    return Promise.all(testablePromises).then((results) => results.filter(isDefined));
  }

  /**
   * Creates a map of filtered testables by file path and name for quick lookup
   */
  private createFilteredTestablesMap(filteredTestables: readonly FilteredTestable[]): Map<string, Set<string>> {
    const filteredTestablesMap = new Map<string, Set<string>>();

    for (const filteredTestable of filteredTestables) {
      const normalizedFilePath = filteredTestable.filePath.startsWith("/")
        ? filteredTestable.filePath
        : `/${filteredTestable.filePath}`;

      if (!filteredTestablesMap.has(normalizedFilePath)) {
        filteredTestablesMap.set(normalizedFilePath, new Set());
      }

      const testableSet = filteredTestablesMap.get(normalizedFilePath);

      if (isDefined(testableSet)) {
        testableSet.add(filteredTestable.name);
      }
    }

    return filteredTestablesMap;
  }

  /**
   * Filters testables based on coverage analysis and applies max testables limit
   */
  private filterAndLimitResults(
    allTestables: [string, SerializedTestable[]][],
    filteredTestablesMap: Map<string, Set<string>>,
    maxTestables: number,
  ): { filePath: string; testable: SerializedTestable }[] {
    const result: { filePath: string; testable: SerializedTestable }[] = [];

    for (const [filePath, testables] of allTestables) {
      const filteredNames = filteredTestablesMap.get(filePath);

      if (isDefined(filteredNames)) {
        for (const testable of testables) {
          if (filteredNames.has(testable.name ?? "")) {
            result.push({ filePath, testable });
          }
        }
      }
    }

    if (maxTestables !== -1 && result.length > maxTestables) {
      core.info(`Limiting testables to ${maxTestables} (from ${result.length} total)`);

      return result.slice(0, maxTestables);
    }

    return result;
  }

  /**
   * Handles failure cases when getting changed files from PR
   */
  private handleChangedFilesFailure(changedFilesResult: ChangedFilesResult): void {
    if (isDefined(changedFilesResult.error)) {
      if (changedFilesResult.error.includes("Not running in pull request context")) {
        core.info("Not running in pull request context, skipping file analysis");
      } else {
        core.warning(`Failed to get changed files: ${changedFilesResult.error}`);
      }
    }
  }

  /**
   * Generate tests
   */
  private async generateTests(
    filteredTestablesResult: {
      filePath: string;
      testable: SerializedTestable;
    }[],
  ): Promise<unknown> {
    return this.tsAgent.bulkGenerateTests(filteredTestablesResult);
  }

  /**
   * Generates final coverage and logs the comparison
   */
  private async generateFinalCoverageAndLog(): Promise<void> {
    core.info("Generating final coverage...");
    await this.tsAgent.generateCoverage();
    const postCoverageTree = await this.tsAgent.getCoverageTree();

    if (!postCoverageTree) {
      throw new Error("Failed to generate final coverage tree");
    }

    // Set post-coverage output
    const finalCoverage = postCoverageTree["/"]?.percentage;

    core.setOutput("post-coverage", finalCoverage);
    // Log coverage comparison
    if (isDefined(this.initialCoverage)) {
      core.info(`Final coverage: ${finalCoverage}%`);
    } else {
      core.info(`Coverage comparison: ${this.initialCoverage}% → ${finalCoverage}%`);
    }
  }

  /**
   * Logs the end of operation
   */
  private async logEndOperation(): Promise<void> {
    if (isDefined(this.workflowRunId)) {
      try {
        await this.apiService.logEndOperation(this.workflowRunId);
        core.info("Successfully logged workflow end");
      } catch (error) {
        core.warning(`Failed to log workflow end: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  }

  // Private properties to store state during the flow
  private workflowRunId: string | undefined;
  private initialCoverage: number | undefined;
}
