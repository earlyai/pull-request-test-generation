import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import axiosRetry from 'axios-retry'

import { isDefined, isEmpty } from '@earlyai/core'

import { AuthService } from '@/services/auth/auth.service.js'
import { UserInfo, UserInfoSchema } from './api.types.js'
import { ConfigService } from '@/services/config/config.service.js'

/**
 * API client for making authenticated requests to the backend
 */
export class ApiService {
  private readonly axiosInstance: AxiosInstance
  private readonly authService: AuthService
  private readonly configService: ConfigService

  public constructor(authService: AuthService, configService: ConfigService) {
    this.authService = authService
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
    let token: string | undefined

    if (await this.authService.isAuthenticated()) {
      token = await this.authService.getToken()
    }

    const headers = new AxiosHeaders({
      'x-request-source': 'CLI',
      ...requestConfig?.headers
    })

    if (isDefined(token) && !isEmpty(token)) {
      headers['authorization'] = `Bearer ${token}`
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
    return this.authService.isAuthenticated()
  }

  public async getToken(): Promise<string | undefined> {
    return this.authService.getToken()
  }

  public getBaseUrl(): string {
    return 'http://localhost:3000'
  }

  public async getUserInfo(): Promise<UserInfo> {
    const response = await this.get<unknown>('api/v1/user/me')

    return UserInfoSchema.parse(response)
  }
}
