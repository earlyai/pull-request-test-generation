import { isEmpty } from '@earlyai/core'

import { FirebaseService } from './firebase/firebase.service.js'
import { ConfigService } from '@/services/config/config.service.js'
import type { ExchangeRequest } from './auth.types.js'
import { ExchangeResponseSchema } from './auth.types.js'

/**
 * Authentication service for managing user authentication
 */
export class AuthService {
  private token: string | undefined
  private readonly firebaseService: FirebaseService
  private readonly configService: ConfigService

  public constructor(
    firebaseService: FirebaseService,
    configService: ConfigService
  ) {
    this.firebaseService = firebaseService
    this.configService = configService
  }

  /**
   * Exchange API key for Firebase custom token and complete authentication flow
   */
  public async exchangeApiKeyForToken(apiKey: string): Promise<string> {
    try {
      // Step 1: Exchange API key for Firebase custom token from backend
      console.info('Exchanging API key for Firebase custom token...')

      // Get baseURL from config service
      const baseURL = this.configService.getConfigValue('baseURL')

      const response = await fetch(
        `${baseURL}/api/auth/sign-in-with-secret-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ secret: apiKey } as ExchangeRequest)
        }
      )

      if (!response.ok) {
        throw new Error(
          `Exchange failed: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()
      const parsedResponse = ExchangeResponseSchema.parse(data)
      const customToken = parsedResponse.token

      // Step 2: Use Firebase REST API to exchange custom token for ID token
      console.info('Exchanging custom token for Firebase ID token...')
      const firebaseResponse =
        await this.firebaseService.signInWithCustomToken(customToken)

      // Step 3: Return the Firebase ID token for storage
      return firebaseResponse.idToken
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Token exchange failed: ${error.message}`)
      }
      throw new Error('Token exchange failed: Unknown error')
    }
  }

  /**
   * Authenticate directly with Firebase custom token
   */
  public async authenticateWithCustomToken(
    customToken: string
  ): Promise<string> {
    try {
      console.info('Authenticating with Firebase custom token...')
      const firebaseResponse =
        await this.firebaseService.signInWithCustomToken(customToken)

      return firebaseResponse.idToken
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Firebase authentication failed: ${error.message}`)
      }
      throw new Error('Firebase authentication failed: Unknown error')
    }
  }

  /**
   * Store authentication credentials in instance variable
   */
  public async setCredentials(token: string): Promise<void> {
    this.token = token
  }

  /**
   * Get stored authentication token from system keychain
   */
  public async getToken(): Promise<string | undefined> {
    if (isEmpty(this.token)) {
      return
    }
    return this.token
  }

  /**
   * Check if user is authenticated
   */
  public async isAuthenticated(): Promise<boolean> {
    return Boolean(await this.getToken())
  }

  /**
   * Get authentication headers for API requests
   */
  public async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await this.getToken()

    if (isEmpty(token)) {
      return {}
    }

    return {
      Authorization: `Bearer ${token}`
    }
  }

  /**
   * Get user information from Firebase
   */
  public async getUserInfo(): Promise<unknown> {
    const token = await this.getToken()

    if (isEmpty(token)) {
      throw new Error('No authentication token available')
    }

    try {
      return await this.firebaseService.getUserInfo(token as string)
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Failed to get user info: ${error.message}`)
      }
      throw new Error('Failed to get user info: Unknown error')
    }
  }
}
