import axios, { AxiosInstance } from 'axios'

import {
  FirebaseRefreshTokenResponse,
  FirebaseRefreshTokenResponseSchema,
  FirebaseSignInResponse,
  FirebaseSignInResponseSchema,
  FirebaseUserInfoResponse,
  FirebaseUserInfoResponseSchema
} from './firebase.types.js'

/**
 * Firebase service for REST API authentication
 */
export class FirebaseService {
  private readonly axiosInstance: AxiosInstance
  private readonly baseUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts'
  private readonly webApiKey = 'place-holder'

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Sign in with Firebase custom token using REST API
   */
  public async signInWithCustomToken(
    customToken: string
  ): Promise<FirebaseSignInResponse> {
    try {
      const response = await this.axiosInstance.post(
        `:signInWithCustomToken?key=${this.webApiKey}`,
        {
          token: customToken,
          returnSecureToken: true
        }
      )

      return FirebaseSignInResponseSchema.parse(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error !== undefined) {
          const firebaseError = error.response.data.error

          throw new Error(
            `Firebase authentication failed: ${firebaseError.message} (${firebaseError.code})`
          )
        }
        throw new Error(
          `Firebase authentication failed: ${error.response?.status} ${error.response?.statusText}`
        )
      }
      throw new Error(
        `Firebase authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Sign in with email and password using REST API
   */
  public async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<FirebaseSignInResponse> {
    try {
      const response = await this.axiosInstance.post(
        `:signInWithPassword?key=${this.webApiKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )

      return FirebaseSignInResponseSchema.parse(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error !== undefined) {
          const firebaseError = error.response.data.error

          throw new Error(
            `Firebase authentication failed: ${firebaseError.message} (${firebaseError.code})`
          )
        }
        throw new Error(
          `Firebase authentication failed: ${error.response?.status} ${error.response?.statusText}`
        )
      }
      throw new Error(
        `Firebase authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Refresh ID token using refresh token
   */
  public async refreshIdToken(
    refreshToken: string
  ): Promise<FirebaseRefreshTokenResponse> {
    try {
      const response = await this.axiosInstance.post(
        `:token?key=${this.webApiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      )

      return FirebaseRefreshTokenResponseSchema.parse(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error !== undefined) {
          const firebaseError = error.response.data.error

          throw new Error(
            `Firebase token refresh failed: ${firebaseError.message} (${firebaseError.code})`
          )
        }
        throw new Error(
          `Firebase token refresh failed: ${error.response?.status} ${error.response?.statusText}`
        )
      }
      throw new Error(
        `Firebase token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Get user information by ID token
   */
  public async getUserInfo(idToken: string): Promise<FirebaseUserInfoResponse> {
    try {
      const response = await this.axiosInstance.post(
        `:lookup?key=${this.webApiKey}`,
        {
          idToken
        }
      )

      return FirebaseUserInfoResponseSchema.parse(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error !== undefined) {
          const firebaseError = error.response.data.error

          throw new Error(
            `Firebase user info lookup failed: ${firebaseError.message} (${firebaseError.code})`
          )
        }
        throw new Error(
          `Firebase user info lookup failed: ${error.response?.status} ${error.response?.statusText}`
        )
      }
      throw new Error(
        `Firebase user info lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}
