import type {
  User,
  CreateUserPayload,
  UpdateUserPayload
} from '@/models/user.model'

import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

let mockUsers: User[] = [
  {
    id: 1,
    fullName: 'admin',
    account: 'admin',
    email: 'admin@tshs.gov.tw',
    status: 'ACTIVE',
    roleCode: 'ADMIN',
    roleName: '系統管理員'
  },
  {
    id: 2,
    fullName: '王小明',
    account: 'test01',
    email: '',
    status: 'ACTIVE',
    roleCode: 'USER',
    roleName: '一般使用者'
  }
]

function mockResponse<T>(data: T, message = '操作成功'): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  }
}

function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* 
📡 Service
*/

const BASE = '/api/v1/users'

export function useUserService() {

  // 取得全部
  const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()
      return mockResponse(mockUsers, '查詢成功 (mock)')
    }

    // 真實 API（保留）
    return $fetch<ApiResponse<User[]>>(BASE, {
      method: 'GET'
    })
  }

  // 單筆
  const fetchUserById = async (id: number): Promise<ApiResponse<User>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()
      const user = mockUsers.find(u => u.id === id)
      if (!user) throw createError({ statusCode: 400, statusMessage: '使用者不存在' })
      return mockResponse(user, '查詢成功 (mock)')
    }

    return $fetch<ApiResponse<User>>(`${BASE}/${id}`, {
      method: 'GET'
    })
  }

  // 新增
  const createUser = async (
    payload: CreateUserPayload
  ): Promise<ApiResponse<User>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()

      const newUser: User = {
        id: Date.now(),
        fullName: payload.fullName,
        account: payload.account,
        email: payload.email || '',
        status: 'ACTIVE',
        roleCode: payload.roleCode,
        roleName: '一般使用者'
      }

      mockUsers.push(newUser)

      return mockResponse(newUser, '使用者新增成功 (mock)')
    }

    return $fetch<ApiResponse<User>>(BASE, {
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

    return $fetch<ApiResponse<User>>(`${BASE}/${id}`, {
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

    return $fetch<ApiResponse<null>>(`${BASE}/${id}`, {
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