// models/auth.model.ts

import type { User } from '@/models/user.model'

export interface LoginPayload {
  account: string
  password: string
}

export interface LoginResponseData {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: User
}

export interface RefreshResponseData {
  accessToken: string
  tokenType: string
  expiresIn: number
}