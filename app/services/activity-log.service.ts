// services/activity-log.service.ts

import type { ActivityLogPageDto } from '@/models/activity-log.model'
import type { ApiResponse } from '@/types/api-response'

/*
🔁 Mock Data
*/
import { mockActivityLogs, mockResponse, delay } from '@/mock/mock'

/* 
📡 Service
*/

export function useActivityLogService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/users`

  // 取得特定ID的使用者日誌
  const fetchActivityLogs = async (
    userId: number,
    page = 0,
    size = 20
  ): Promise<ApiResponse<ActivityLogPageDto>> => {
    const config = useRuntimeConfig()
    const isMock = config.public.useMockApi

    const { $api } = useNuxtApp()

    if (isMock) {
      await delay()

      // 篩選該使用者的日誌
      const userLogs = mockActivityLogs.filter(log => log.userId === userId)

      // 分頁切片
      const start = page * size
      const end = start + size
      const pageLogs = userLogs.slice(start, end)

      const result: ActivityLogPageDto = {
        content: pageLogs,
        page,
        size,
        totalElements: userLogs.length,
        totalPages: Math.ceil(userLogs.length / size)
      }

      return mockResponse(result, '查詢成功 (mock)')
    }

    // 真實 API
    return $api<ApiResponse<ActivityLogPageDto>>(
      `${BASE}/${userId}/activity-logs?page=${page}&size=${size}`,
      {
        method: 'GET'
      }
    )
  }

  return { fetchActivityLogs }
}