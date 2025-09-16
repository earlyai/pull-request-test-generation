import { injectable } from "inversify";

import * as core from "@actions/core";
import { isDefined } from "@earlyai/core";

import type { ChangedFilesData, SummaryData } from "./summary.types.js";

/**
 * Service for collecting and formatting summary data from various services
 */
@injectable()
export class SummaryService {
  private data: SummaryData = {
    warnings: [],
  };

  /**
   * Sets changed files data
   */
  public setChangedFilesData(data: ChangedFilesData): void {
    this.data.changedFiles = data;
  }

  /**
   * Sets coverage data
   */
  public setCoverageData(before: number, after: number): void {
    this.data.coverage = { before, after };
  }

  /**
   * Sets test generation data
   */
  public setTestGenerationData(generated: number): void {
    this.data.testGeneration = { generated };
  }

  /**
   * Sets auto-commit status
   */
  public setAutoCommitStatus(isEnabled: boolean): void {
    this.data.autoCommit = { enabled: isEnabled };
  }

  /**
   * Adds a warning message
   */
  public addWarning(message: string): void {
    this.data.warnings.push({ message });
  }

  /**
   * Generates markdown summary from collected data
   */
  public generateMarkdownSummary(): string {
    const lines: string[] = [];

    // Add warnings first
    for (const warning of this.data.warnings) {
      lines.push(`⚠️ ${warning.message}`);
    }

    // Add main report header
    lines.push("", "🧪 **Early TypeScript Agent Report**", "");

    // Add changed files data
    if (this.data.changedFiles) {
      const { changedFilesCount, candidateFilesCount, functionCount, testablesToGenerateCount } =
        this.data.changedFiles;

      lines.push(
        `- Changed files: ${changedFilesCount}`,
        `- Files with testable code: ${candidateFilesCount}`,
        `- Total methods: ${functionCount}`,
        `- Public methods below threshold: ${testablesToGenerateCount}`,
      );
    }

    // Add coverage data
    if (this.data.coverage) {
      const { before, after } = this.data.coverage;

      lines.push(`- Coverage: ${before}% → ${after}%`);
    }

    // Add test generation data
    if (this.data.testGeneration) {
      const { generated } = this.data.testGeneration;

      lines.push("", `✅ Generated unit tests for ${generated} public functions below threshold.`);
    }

    // Add auto-commit status
    if (isDefined(this.data.autoCommit) && this.data.autoCommit.enabled) {
      lines.push("ℹ️ Auto-committed test files to this branch.");
    }

    return lines.join("\n");
  }

  /**
   * Adds summary to GitHub job summary
   */
  public async addToJobSummary(): Promise<void> {
    try {
      const summary = this.generateMarkdownSummary();

      await core.summary.addRaw(summary).write();
      core.info("Successfully added summary to job summary");
    } catch (error) {
      core.warning(`Failed to add summary to job summary: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Clears all collected data
   */
  public clear(): void {
    this.data = {
      warnings: [],
    };
  }
}
