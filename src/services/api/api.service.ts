import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import axiosRetry from 'axios-retry'

import { isDefined } from '@earlyai/core'

import { UserInfo, UserInfoSchema } from './api.types.js'
import { ConfigService } from '@/services/config/config.service.js'
import { GitInfo } from '@/services/git/git.types.js'

/**
 * API client for making authenticated requests to the backend
 */
export class ApiService {
  private readonly axiosInstance: AxiosInstance
  private readonly configService: ConfigService
  private idToken: string | undefined

  public constructor(configService: ConfigService) {
    this.configService = configService

    //use config to get baseURL
    this.axiosInstance = axios.create({
      baseURL: this.configService.getConfigValue('baseURL'),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add retry logic
    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error: unknown) => {
        // Retry on network errors and 5xx status codes
        return (
          (axios.isAxiosError(error) &&
            axiosRetry.isNetworkOrIdempotentRequestError(error)) ||
          (axios.isAxiosError(error) &&
            error.response?.status !== undefined &&
            error.response.status >= 500) ||
          false
        )
      }
    })
  }

  /**
   * Authenticates with the API using the configured API key
   * @throws Error if authentication fails
   */
  public async login(): Promise<void> {
    const apiKey = this.configService.getConfigValue('apiKey')
    if (!apiKey) {
      throw new Error('API key is required but not configured')
    }

    try {
      const response = await this.axiosInstance.post(
        'auth/v2/sign-in-with-secret-token',
        {
          secret: apiKey
        }
      )

      if (response.data && response.data.idToken) {
        this.idToken = response.data.idToken
      } else {
        throw new Error('Authentication response missing idToken')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Authentication failed: ${error.response.status} ${error.response.statusText}`
          )
        } else if (error.request) {
          throw new Error(
            'Authentication failed: No response received from server'
          )
        }
      }
      throw new Error(
        `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Gets the authorization headers for authenticated requests
   * @returns Headers object with authorization token if available
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'x-request-source': 'CLI'
    }

    if (this.idToken) {
      headers['authorization'] = `Bearer ${this.idToken}`
    }

    return headers
  }

  /**
   * Make a generic API call
   * Authentication is optional; if available, a token will be attached.
   */
  private async apiCall<R = unknown, T = unknown>({
    url,
    method,
    data,
    config: requestConfig
  }: {
    url: string
    method: Method
    data?: T
    config?: AxiosRequestConfig<T>
  }): Promise<AxiosResponse<R>> {
    const authHeaders = this.getAuthHeaders()
    const headers = new AxiosHeaders(authHeaders)

    // Add request config headers
    if (requestConfig?.headers) {
      Object.entries(requestConfig.headers).forEach(([key, value]) => {
        headers.set(key, value)
      })
    }

    const axiosConfig: AxiosRequestConfig<T> = {
      ...requestConfig,
      method,
      url,
      data,
      headers
    }

    try {
      return await this.axiosInstance.request(axiosConfig)
    } catch (error) {
      this.handleError(url, error)
    }
  }

  public async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.apiCall<T>({
      url: endpoint,
      method: 'GET',
      config
    })

    return response.data
  }

  public async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCall<T, D>({
      url: endpoint,
      method: 'POST',
      data,
      config
    })

    return response.data
  }

  public async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCall<T, D>({
      url: endpoint,
      method: 'PUT',
      data,
      config
    })

    return response.data
  }

  public async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.apiCall<T>({
      url: endpoint,
      method: 'DELETE',
      config
    })

    return response.data
  }

  public async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    const response = await this.apiCall<T, D>({
      url: endpoint,
      method: 'PATCH',
      data,
      config
    })

    return response.data
  }

  public async head<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiCall<T>({
      url: endpoint,
      method: 'HEAD',
      config
    })
  }

  public async options<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiCall<T>({
      url: endpoint,
      method: 'OPTIONS',
      config
    })
  }

  private handleError(url: string, error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (isDefined(error.response)) {
        // Server responded with error status
        const response = error.response
        const { status, statusText, data: errorData } = response

        throw new Error(
          `API request failed: ${status} ${statusText} - ${JSON.stringify(errorData)}`
        )
      } else if (isDefined(error.request)) {
        // Request was made but no response received
        throw new Error(`API request failed: No response received from ${url}`)
      } else {
        // Something else happened while setting up the request
        throw new Error(
          `API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    } else if (error instanceof Error) {
      throw new TypeError(`API request failed: ${error.message}`)
    } else {
      throw new TypeError(`API request failed: Unknown error occurred`)
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    return isDefined(this.idToken)
  }

  public async getToken(): Promise<string | undefined> {
    return this.idToken
  }

  public getBaseUrl(): string {
    return (
      this.configService.getConfigValue('baseURL') ||
      'https://api.startearly.ai'
    )
  }

  public async getUserInfo(): Promise<UserInfo> {
    const response = await this.get<unknown>('api/v1/user/me')

    return UserInfoSchema.parse(response)
  }

  /**
   * Logs the start of a workflow operation
   * @param gitInfo Git repository information
   * @returns Promise resolving to the workflow run ID
   */
  public async logStartOperation(gitInfo: GitInfo): Promise<string> {
    const config = this.configService.getConfig()

    // Get PR URL from GitHub context if available
    const prUrl =
      process.env.GITHUB_SERVER_URL &&
      process.env.GITHUB_REPOSITORY &&
      process.env.GITHUB_EVENT_NAME === 'pull_request'
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/pull/${process.env.GITHUB_EVENT_PATH ? JSON.parse(process.env.GITHUB_EVENT_PATH).number : ''}`
        : undefined

    const requestData = {
      type: 'GENERATE_TESTS',
      owner: gitInfo.owner,
      repo: gitInfo.repository,
      sourceRef: gitInfo.ref_name,
      commitSha: gitInfo.sha,

      // From ConfigService
      threshold: config.coverageThreshold,
      testLocation: config.testStructure,
      testNaming: config.testFileName,
      operationStartedAt: new Date().toISOString(),

      // From GitHub Context (if available)
      prUrl
    }

    const response = await this.post<{ id: string }>(
      'api/v1/workflows/open',
      requestData
    )
    return response.id
  }

  /**
   * Logs the end of a workflow operation
   * @param workflowRunId The workflow run ID from the start operation
   */
  public async logEndOperation(workflowRunId: string): Promise<void> {
    const requestData = {
      workflowRunId,
      operationEndedAt: new Date().toISOString()
    }

    await this.post('api/v1/workflows/close', requestData)
  }
}
