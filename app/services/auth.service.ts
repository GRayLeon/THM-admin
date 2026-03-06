// services/auth.service.ts

import type {
  LoginPayload,
  LoginResponseData,
  RefreshResponseData
} from '@/models/auth.model'
import type { User } from '@/models/user.model'
import type { ApiResponse } from '@/types/api-response'

export function useAuthService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/auth`

  const login = async (
    payload: LoginPayload
  ): Promise<ApiResponse<LoginResponseData>> => {

    return $fetch(`${BASE}/login`, {
      method: 'POST',
      body: payload
    })
  }

  const refresh = async (
    refreshToken: string
  ): Promise<ApiResponse<RefreshResponseData>> => {

    return $fetch(`${BASE}/refresh`, {
      method: 'POST',
      body: { refreshToken }
    })
  }

  const logout = async (): Promise<ApiResponse<null>> => {

    return $fetch(`${BASE}/logout`, {
      method: 'POST'
    })
  }

  const profile = async (): Promise<ApiResponse<User>> => {

    const { $api } = useNuxtApp()

    return $api<ApiResponse<User>>(`${BASE}/profile`, {
      method: 'GET'
    })
  }

  return {
    login,
    refresh,
    logout,
    profile
  }
}