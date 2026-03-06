// services/role.service.ts

import type { 
  Role,
  CreateRolePayload,
  UpdateRolePayload
} from '@/models/role.model'

import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

import { mockRoles, mockResponse, delay } from '@/mock/mock'

/* 
📡 Service
*/

export function useRoleService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/roles`

  // 取得全部
  const fetchRoles = async (): Promise<ApiResponse<Role[]>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      return mockResponse(mockRoles, '查詢成功 (mock)')
    }
    
    return $api<ApiResponse<Role[]>>(BASE, {
      method: 'GET'
    })
  }

  // 新增
  const createRole = async (payload: CreateRolePayload): Promise<ApiResponse<Role>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

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

    return $api<ApiResponse<Role>>(BASE, {
      method: 'POST',
      body: payload
    })
  }

  // 修改
  const updateRole = async (code: string, payload: UpdateRolePayload): Promise<ApiResponse<Role>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

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

    return $api<ApiResponse<Role>>(`${BASE}/${code}`, {
      method: 'PUT',
      body: payload
    })
  }

  const deleteRole = async (code: string): Promise<ApiResponse<null>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      const index = mockRoles.findIndex(r => r.code === code)
      if (index === -1) throw createError({ statusCode: 400, statusMessage: '角色不存在' })
      mockRoles.splice(index, 1)
      return mockResponse(null, '角色已刪除 (mock)')
    }

    return $api<ApiResponse<null>>(`${BASE}/${code}`, {
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