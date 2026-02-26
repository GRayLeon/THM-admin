// services/role.service.ts
import type { 
  Role,
  RolePayload
} from '@/models/role.model'

import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

export let mockRoles: Role[] = [
  {
    code: 'ADMIN',
    name: '管理員',
    description: '所有權限的管理員',
    functions: [
      { code: 'HOME_MGMT', name: '首頁管理' },
      { code: 'SPOT_MGMT', name: '地點管理' },
      { code: 'THEME_MGMT', name: '分類管理' },
      { code: 'USER_MGMT', name: '帳號管理' },
      { code: 'ROLE_MGMT', name: '角色管理' }
    ]
  },
  {
    code: 'USER',
    name: '一般使用者',
    description: '可以編輯內容',
    functions: [
      { code: 'HOME_MGMT', name: '首頁管理' },
      { code: 'SPOT_MGMT', name: '地點管理' }
    ]
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

const BASE = '/api/v1/roles'

export function useRoleService() {

  // 取得全部
  const fetchRoles = async (): Promise<ApiResponse<Role[]>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()
      return mockResponse(mockRoles, '查詢成功 (mock)')
    }

    // 真實 API（保留）
    return $fetch<ApiResponse<Role[]>>(BASE, {
      method: 'GET'
    })
  }

  // 新增
  const createRole = async (payload: RolePayload): Promise<ApiResponse<Role>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()

      // 檢查代碼唯一
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      if (mockRoles.some(r => r.name === payload.name))
        throw createError({ statusCode: 400, statusMessage: '角色名稱已存在' })

      const newRole: Role = {
        code,
        name: payload.name,
        description: payload.description,
        functions: payload.functionCodes.map(code => ({
          code,
          name: code // mock 名稱就用 code
        }))
      }
      mockRoles.push(newRole)
      return mockResponse(newRole, '新增成功 (mock)')
    }

    return $fetch<ApiResponse<Role>>(BASE, {
      method: 'POST',
      body: payload
    })
  }

  // 修改
  const updateRole = async (code: string, payload: RolePayload): Promise<ApiResponse<Role>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()
      const index = mockRoles.findIndex(r => r.code === code)
      if (index === -1) throw createError({ statusCode: 400, statusMessage: '角色不存在' })

      const role = mockRoles.find(r => r.code === code)

      if (!role) {
        throw createError({
          statusCode: 400,
          statusMessage: '角色不存在'
        })
      }

      // 更新欄位
      if (payload.name) {
        role.name = payload.name
      }
        
      if (payload.description) {
        role.description = payload.description
      }

      if (payload.functionCodes) {
        role.functions = payload.functionCodes.map(fc => ({ code: fc, name: fc }))
      }

      return mockResponse(role, '修改成功 (mock)')
    }

    return $fetch<ApiResponse<Role>>(`${BASE}/${code}`, {
      method: 'PUT',
      body: payload
    })
  }

  const deleteRole = async (code: string): Promise<ApiResponse<null>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    if (isMock) {
      await delay()
      const index = mockRoles.findIndex(r => r.code === code)
      if (index === -1) throw createError({ statusCode: 400, statusMessage: '角色不存在' })
      mockRoles.splice(index, 1)
      return mockResponse(null, '角色已刪除 (mock)')
    }

    return $fetch<ApiResponse<null>>(`${BASE}/${code}`, {
      method: 'DELETE'
    })
  }

  return { 
    fetchRoles,
    createRole,
    updateRole,
    deleteRole
  }
}