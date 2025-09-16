import { exec } from "node:child_process";
import { promisify } from "node:util";

import { injectable } from "inversify";

import * as core from "@actions/core";
import { isDefined } from "@earlyai/core";

import { getConfigService } from "@/utils/config-factory.js";

import { CommitResult, GitInfo, IGitService } from "./git.types.js";

const rawExec = promisify(exec);

async function execAsync(
  command: string,
  options: Record<string, unknown> = {},
): Promise<{ stdout: string; stderr: string }> {
  const configService = getConfigService();
  const config = configService.getConfig();

  return await rawExec(command, { cwd: config.rootPath, ...options });
}
/**
 * Service for gathering Git repository information
 */
@injectable()
export class GitService implements IGitService {
  /**
   * Gets Git information from the local repository
   * @returns Promise resolving to Git information
   */
  public async getGitInfo(): Promise<GitInfo> {
    try {
      // Try to get information from local Git repository
      const localInfo = await this.getLocalGitInfo();

      return localInfo;
    } catch (error) {
      core.warning(`Failed to get local Git info: ${error instanceof Error ? error.message : "Unknown error"}`);

      // Fallback to GitHub Actions context
      try {
        const contextInfo = this.getContextInfo();

        core.warning("Using GitHub Actions context as fallback for Git information");

        return contextInfo;
      } catch (contextError) {
        core.warning(
          `Failed to get context info: ${contextError instanceof Error ? contextError.message : "Unknown error"}`,
        );

        // Return empty strings if all sources fail
        return {
          ref_name: "",
          repository: "",
          owner: "",
          sha: "",
        };
      }
    }
  }

  /**
   * Gets Git information from the local Git repository
   * @returns Promise resolving to Git information
   * @throws Error if Git commands fail
   */
  private async getLocalGitInfo(): Promise<GitInfo> {
    const [refName, sha, remoteUrl] = await Promise.all([this.getRefName(), this.getSha(), this.getRemoteUrl()]);

    const { owner, repository } = this.parseRemoteUrl(remoteUrl);

    return {
      ref_name: refName,
      repository,
      owner,
      sha,
    };
  }

  /**
   * Gets the current reference name (branch, tag, or commit)
   * @returns Promise resolving to reference name
   */
  private async getRefName(): Promise<string> {
    try {
      const { stdout } = await execAsync("git rev-parse --abbrev-ref HEAD");

      return stdout.trim();
    } catch {
      core.warning("Could not get ref_name from local Git");

      return "";
    }
  }

  /**
   * Gets the current commit SHA
   * @returns Promise resolving to commit SHA
   */
  private async getSha(): Promise<string> {
    try {
      const { stdout } = await execAsync("git rev-parse HEAD");

      return stdout.trim();
    } catch {
      core.warning("Could not get SHA from local Git");

      return "";
    }
  }

  /**
   * Gets the origin remote URL
   * @returns Promise resolving to remote URL
   */
  private async getRemoteUrl(): Promise<string> {
    try {
      const { stdout } = await execAsync("git remote get-url origin");

      return stdout.trim();
    } catch {
      core.warning("Could not get remote URL from local Git");

      return "";
    }
  }

  /**
   * Parses the remote URL to extract owner and repository
   * @param remoteUrl The remote URL from Git
   * @returns Object containing owner and repository
   */
  private parseRemoteUrl(remoteUrl: string): {
    owner: string;
    repository: string;
  } {
    if (!remoteUrl) {
      return { owner: "", repository: "" };
    }

    try {
      // Handle HTTPS URLs: https://github.com/owner/repo.git
      if (remoteUrl.startsWith("https://")) {
        const url = new URL(remoteUrl);
        const pathParts = url.pathname.split("/").filter(Boolean);

        if (pathParts.length >= 2) {
          return {
            owner: pathParts[0],
            repository: pathParts[1].replace(".git", ""),
          };
        }
      }

      // Handle SSH URLs: git@github.com:owner/repo.git
      if (remoteUrl.includes("@") && remoteUrl.includes(":")) {
        const parts = remoteUrl.split(":");

        if (parts.length === 2) {
          const pathParts = parts[1].split("/").filter(Boolean);

          if (pathParts.length >= 2) {
            return {
              owner: pathParts[0],
              repository: pathParts[1].replace(".git", ""),
            };
          }
        }
      }

      return { owner: "", repository: "" };
    } catch {
      core.warning(`Failed to parse remote URL: ${remoteUrl}`);

      return { owner: "", repository: "" };
    }
  }

  /**
   * Gets Git information from GitHub Actions context
   * @returns Git information from context
   */
  private getContextInfo(): GitInfo {
    const refName = process.env.GITHUB_REF_NAME ?? "";
    const repository = process.env.GITHUB_REPOSITORY ?? "";
    const sha = process.env.GITHUB_SHA ?? "";

    // Parse owner/repo from GITHUB_REPOSITORY (format: "owner/repo")
    const [owner, repo] = repository.split("/");
    const repoName = repo || "";

    return {
      ref_name: refName,
      repository: repoName,
      owner: owner || "",
      sha,
    };
  }

  public async getEarlyFiles(): Promise<string[]> {
    const { stdout: modifiedFiles } = await execAsync("git ls-files --others --exclude-standard --modified");
    const files = modifiedFiles.trim().split("\n").filter(Boolean);

    return files.filter((file) => file.includes(".early."));
  }

  /**
   * Commits files that are both modified and match the .early. pattern
   * @returns Promise resolving to commit result with file count and error status
   */
  public async commitFiles(branch?: string): Promise<CommitResult> {
    try {
      //init git
      if (isDefined(branch)) {
        await execAsync(`git checkout ${branch}`);
      }
      // await execAsync('git config user.name "github-actions[bot]"');
      // await execAsync('git config user.email "github-actions[bot]@users.noreply.github.com"');

      const earlyFiles = await this.getEarlyFiles();

      if (earlyFiles.length === 0) {
        await execAsync(
          'git -c user.name="github-actions[bot]" -c user.email="github-actions[bot]@users.noreply.github.com" commit --allow-empty -m "chore: add early catch tests [skip ci]" ',
        );
        core.info("No files to commit - created empty commit");

        return { committedFiles: [], error: "" };
      }

      for (const file of earlyFiles) {
        await execAsync(`git add "${file}"`);
      }

      await execAsync(
        'git -c user.name="github-actions[bot]" -c user.email="github-actions[bot]@users.noreply.github.com" commit --no-verify -m "chore: add early-catch tests [skip ci]" ',
      );

      core.info(`Committed ${earlyFiles.length} files`);

      await execAsync("git push --no-verify");

      return { committedFiles: earlyFiles, error: "" };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      core.error(`Failed to commit files: ${errorMessage}`);

      return { committedFiles: [], error: errorMessage };
    }
  }
}
