// services/user.service.ts

import type {
  User,
  CreateUserPayload,
  UpdateUserPayload
} from '@/models/user.model'

import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

import { mockUsers, mockResponse, delay } from '@/mock/mock'

/* 
📡 Service
*/

export function useUserService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/users`

  // 取得全部
  const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      return mockResponse(mockUsers, '查詢成功 (mock)')
    }

    // 真實 API（保留）
    return $api<ApiResponse<User[]>>(BASE, {
      method: 'GET'
    })
  }

  // 單筆
  const fetchUserById = async (id: number): Promise<ApiResponse<User>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      const user = mockUsers.find(u => u.id === id)
      if (!user) throw createError({ statusCode: 400, statusMessage: '使用者不存在' })
      return mockResponse(user, '查詢成功 (mock)')
    }

    return $api<ApiResponse<User>>(`${BASE}/${id}`, {
      method: 'GET'
    })
  }

  // 新增
  const createUser = async (
    payload: CreateUserPayload
  ): Promise<ApiResponse<User>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()

      const newUser: User = {
        id: Date.now(),
        account: payload.account,
        status: 'ACTIVE',
        roleCode: payload.roleCode,
        roleName: '一般使用者'
      }

      mockUsers.push(newUser)

      return mockResponse(newUser, '使用者新增成功 (mock)')
    }

    return $api<ApiResponse<User>>(BASE, {
      method: 'POST',
      body: payload
    })
  }

  // 修改
  const updateUser = async (
    id: number,
    payload: UpdateUserPayload
  ): Promise<ApiResponse<User>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()

      const user = mockUsers.find(u => u.id === id)

      if (!user) {
        throw createError({
          statusCode: 400,
          statusMessage: '使用者不存在'
        })
      }

      // 更新欄位
      if (payload.roleCode) {
        user.roleCode = payload.roleCode
      }

      // mock 不真的處理 password，只模擬成功
      return mockResponse(user, '修改成功 (mock)')
    }

    return $api<ApiResponse<User>>(`${BASE}/${id}`, {
      method: 'PUT',
      body: payload
    })
  }

  /* ===== 刪除 ===== */
  const deleteUser = async (
    id: number
  ): Promise<ApiResponse<null>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()

      const user = mockUsers.find(u => u.id === id)

      if (!user)
        throw createError({
          statusCode: 400,
          statusMessage: '使用者不存在'
        })

      user.status = 'INACTIVE'

      return mockResponse(null, '使用者已刪除 (mock)')
    }

    return $api<ApiResponse<null>>(`${BASE}/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
  }
}