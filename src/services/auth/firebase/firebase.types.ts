import z from 'zod'

// Constants
export const UNKNOWN_ERROR_MESSAGE = 'Unknown error'

// Firebase REST API schemas
export const FirebaseSignInResponseSchema = z
  .object({
    idToken: z.string(),
    refreshToken: z.string().optional(),
    expiresIn: z.string().optional(),
    localId: z.string().optional(),
    email: z.string().optional(),
    displayName: z.string().optional(),
    registered: z.boolean().optional(),
    // Handle alternative field names
    id_token: z.string().optional(),
    expires_in: z.string().optional(),
    user_id: z.string().optional()
  })
  .transform((data) => ({
    idToken: data.idToken ?? data.id_token ?? '',
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn ?? data.expires_in ?? '3600',
    localId: data.localId ?? data.user_id ?? '',
    email: data.email,
    displayName: data.displayName,
    registered: data.registered
  }))

export const FirebaseRefreshTokenResponseSchema = z.object({
  id_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
  user_id: z.string(),
  project_id: z.string()
})

export const FirebaseUserInfoResponseSchema = z.object({
  users: z.array(
    z.object({
      localId: z.string(),
      email: z.string().optional(),
      displayName: z.string().optional(),
      emailVerified: z.boolean().optional(),
      providerUserInfo: z
        .array(
          z.object({
            providerId: z.string(),
            displayName: z.string().optional(),
            photoUrl: z.string().optional(),
            federatedId: z.string().optional(),
            email: z.string().optional(),
            rawId: z.string().optional()
          })
        )
        .optional(),
      photoUrl: z.string().optional(),
      lastLoginAt: z.string().optional(),
      createdAt: z.string().optional(),
      lastRefreshAt: z.string().optional()
    })
  )
})

export type FirebaseSignInResponse = z.infer<
  typeof FirebaseSignInResponseSchema
>
export type FirebaseRefreshTokenResponse = z.infer<
  typeof FirebaseRefreshTokenResponseSchema
>
export type FirebaseUserInfoResponse = z.infer<
  typeof FirebaseUserInfoResponseSchema
>
