// services/role.service.ts

import type { 
  Theme,
  BatchThemePayload
} from '@/models/theme.model'

import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

import { mockThemes, mockResponse, delay } from '@/mock/mock'

/* 
📡 Service
*/

export function useThemeService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/themes`

  // 取得全部
  const fetchThemes = async (languageCode?: string): Promise<ApiResponse<Theme[]>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      return mockResponse(mockThemes, '查詢成功 (mock)')
    }
    
    return $api<ApiResponse<Theme[]>>(`${BASE}?languageCode=${languageCode}`, {
      method: 'GET'
    })
  }

  const updateAllThemes = async (
    payload: BatchThemePayload[],
    languageCode?: string
  ): Promise<ApiResponse<Theme[]>[]> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      return [mockResponse(mockThemes, '修改成功 (mock)')]
    }

    const results = await Promise.all(
      payload.map(item =>
        $api<ApiResponse<Theme[]>>(`${BASE}/${item.id}?languageCode=${languageCode}`, {
          method: 'PUT',
          body: item.data
        })
      )
    )

    return results
  }

  return { 
    fetchThemes,
    updateAllThemes
  }
}