// services/index.service.ts
import { storeToRefs } from 'pinia'

import type {
  IndexData,
  IndexDataPayload
} from '@/models/index.model'
import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/

import { mockIndexData, mockResponse, delay } from '@/mock/mock'

/* 
📡 Service
*/

export function useIndexService() {  

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/home-management`

  // 取得
  const fetchIndexData = async (languageCode: string): Promise<ApiResponse<IndexData>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()
      return mockResponse(mockIndexData, '查詢成功 (mock)')
    }

    // 真實 API（保留）
    return $api<ApiResponse<IndexData>>(`${BASE}?languageCode=${languageCode}`, {
      method: 'GET'
    })
  }


  // 修改
  const updateIndexData = async (
    payload: IndexDataPayload,
    languageCode: string
  ): Promise<ApiResponse<IndexData>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()

      // mock 不真的處理 password，只模擬成功
      return mockResponse(mockIndexData, '修改成功 (mock)')
    }

    return $api<ApiResponse<IndexData>>(`${BASE}?languageCode=${languageCode}`, {
      method: 'PUT',
      body: payload
    })
  }

  return {
    fetchIndexData,
    updateIndexData
  }
}