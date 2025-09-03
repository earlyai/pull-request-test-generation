import { injectable } from 'inversify'
import * as core from '@actions/core'
import { exec } from 'child_process'
import { promisify } from 'util'
import { GitInfo, IGitService } from './git.types.js'

const execAsync = promisify(exec)

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
      const localInfo = await this.getLocalGitInfo()
      return localInfo
    } catch (error) {
      core.warning(
        `Failed to get local Git info: ${error instanceof Error ? error.message : 'Unknown error'}`
      )

      // Fallback to GitHub Actions context
      try {
        const contextInfo = this.getContextInfo()
        core.warning(
          'Using GitHub Actions context as fallback for Git information'
        )
        return contextInfo
      } catch (contextError) {
        core.warning(
          `Failed to get context info: ${contextError instanceof Error ? contextError.message : 'Unknown error'}`
        )

        // Return empty strings if all sources fail
        return {
          ref_name: '',
          repository: '',
          owner: '',
          sha: ''
        }
      }
    }
  }

  /**
   * Gets Git information from the local Git repository
   * @returns Promise resolving to Git information
   * @throws Error if Git commands fail
   */
  private async getLocalGitInfo(): Promise<GitInfo> {
    const [refName, sha, remoteUrl] = await Promise.all([
      this.getRefName(),
      this.getSha(),
      this.getRemoteUrl()
    ])

    const { owner, repository } = this.parseRemoteUrl(remoteUrl)

    return {
      ref_name: refName,
      repository,
      owner,
      sha
    }
  }

  /**
   * Gets the current reference name (branch, tag, or commit)
   * @returns Promise resolving to reference name
   */
  private async getRefName(): Promise<string> {
    try {
      const { stdout } = await execAsync('git rev-parse --abbrev-ref HEAD')
      return stdout.trim()
    } catch {
      core.warning('Could not get ref_name from local Git')
      return ''
    }
  }

  /**
   * Gets the current commit SHA
   * @returns Promise resolving to commit SHA
   */
  private async getSha(): Promise<string> {
    try {
      const { stdout } = await execAsync('git rev-parse HEAD')
      return stdout.trim()
    } catch {
      core.warning('Could not get SHA from local Git')
      return ''
    }
  }

  /**
   * Gets the origin remote URL
   * @returns Promise resolving to remote URL
   */
  private async getRemoteUrl(): Promise<string> {
    try {
      const { stdout } = await execAsync('git remote get-url origin')
      return stdout.trim()
    } catch {
      core.warning('Could not get remote URL from local Git')
      return ''
    }
  }

  /**
   * Parses the remote URL to extract owner and repository
   * @param remoteUrl The remote URL from Git
   * @returns Object containing owner and repository
   */
  private parseRemoteUrl(remoteUrl: string): {
    owner: string
    repository: string
  } {
    if (!remoteUrl) {
      return { owner: '', repository: '' }
    }

    try {
      // Handle HTTPS URLs: https://github.com/owner/repo.git
      if (remoteUrl.startsWith('https://')) {
        const url = new URL(remoteUrl)
        const pathParts = url.pathname.split('/').filter(Boolean)
        if (pathParts.length >= 2) {
          return {
            owner: pathParts[0],
            repository: pathParts[1].replace('.git', '')
          }
        }
      }

      // Handle SSH URLs: git@github.com:owner/repo.git
      if (remoteUrl.includes('@') && remoteUrl.includes(':')) {
        const parts = remoteUrl.split(':')
        if (parts.length === 2) {
          const pathParts = parts[1].split('/').filter(Boolean)
          if (pathParts.length >= 2) {
            return {
              owner: pathParts[0],
              repository: pathParts[1].replace('.git', '')
            }
          }
        }
      }

      return { owner: '', repository: '' }
    } catch {
      core.warning(`Failed to parse remote URL: ${remoteUrl}`)
      return { owner: '', repository: '' }
    }
  }

  /**
   * Gets Git information from GitHub Actions context
   * @returns Git information from context
   */
  private getContextInfo(): GitInfo {
    const refName = process.env.GITHUB_REF_NAME || ''
    const repository = process.env.GITHUB_REPOSITORY || ''
    const sha = process.env.GITHUB_SHA || ''

    // Parse owner/repo from GITHUB_REPOSITORY (format: "owner/repo")
    const [owner, repo] = repository.split('/')
    const repoName = repo || ''

    return {
      ref_name: refName,
      repository: repoName,
      owner: owner || '',
      sha
    }
  }
}
