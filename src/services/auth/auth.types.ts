import { z } from 'zod'

// API key exchange request/response schemas
export const ExchangeRequestSchema = z.object({
  secret: z.string()
})

export const ExchangeResponseSchema = z.object({
  token: z.string()
})

export type ExchangeRequest = z.infer<typeof ExchangeRequestSchema>
export type ExchangeResponse = z.infer<typeof ExchangeResponseSchema>

// Authentication credentials schema
export const AuthCredentialsSchema = z.object({
  token: z.string(),
  expiresAt: z.number().optional()
})

export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>
