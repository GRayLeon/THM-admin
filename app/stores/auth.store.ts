// stores/auth.store.ts

import { defineStore } from 'pinia'
import { useAuthService } from '@/services/auth.service'
import type { User } from '@/models/user.model'

export const useAuthStore = defineStore('auth', () => {

  const service = useAuthService()

  const accessToken = useCookie<string | null>('access_token')
  const refreshToken = useCookie<string | null>('refresh_token')

  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!accessToken.value)
  // const isAuthenticated = computed(() => true)

  // Login

  const login = async (account: string, password: string) => {
    loading.value = true

    try {
      const res = await service.login({ account, password })

      accessToken.value = res.data.accessToken
      refreshToken.value = res.data.refreshToken
      user.value = res.data.user

      return res
    } finally {
      loading.value = false
    }
  }

  // Refresh

  const refreshAccessToken = async () => {
    if (!refreshToken.value) throw new Error('No refresh token')

    const res = await service.refresh(refreshToken.value)

    accessToken.value = res.data.accessToken

    return res
  }

  // Logout

  const logout = async () => {
    try {
      await service.logout()
    } catch (_) {}

    accessToken.value = null
    refreshToken.value = null
    user.value = null

    await navigateTo('/login')
  }

  // Fetch Profile

  const fetchProfile = async () => {
    const res = await service.profile()
    user.value = res.data
  }

  return {
    accessToken,
    refreshToken,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken,
    fetchProfile
  }
})