// services/spot.service.ts

import type {
  Spot,
  SpotPayload,
  SpotListResponseData,
  SpotDetailResponseData
} from '@/models/spot.model'
import type { ApiResponse } from '@/types/api-response'

/* 
📡 Service
*/

export function useSpotService() {

  const apiUrl = 'https://api.thm720.com/cms-service'
  const BASE = `${apiUrl}/api/v1/spot-management`

  // 取得全部
  const fetchSpotList = async (categoryId?: number, languageCode?: string): Promise<ApiResponse<SpotListResponseData>> => {

    const { $api } = useNuxtApp()

    const categoryParam = categoryId ? `?categoryId=${categoryId}` : ''
    return $api<ApiResponse<SpotListResponseData>>(
      `${BASE}/list?languageCode=${languageCode}`,
      { 
        method: 'GET',
        query: categoryParam ? { categoryParam } : undefined
      }
    )
  }


  // 取得編輯頁
  const fetchSpotInit = async (
    id?: number,
    languageCode?: string
  ): Promise<ApiResponse<SpotDetailResponseData>> => {

    const { $api } = useNuxtApp()

    return $api<ApiResponse<SpotDetailResponseData>>(
      `${BASE}/spot?languageCode=${languageCode}`,
      {
        method: 'GET',
        query: id ? { id } : undefined
      }
    )
  }


  // 新增
  const createSpot = async (
    payload: SpotPayload,
    languageCode: string
  ): Promise<ApiResponse<Spot>> => {

    const { $api } = useNuxtApp()

    return $api<ApiResponse<Spot>>(`${BASE}?languageCode=${languageCode}`, {
      method: 'POST',
      body: payload
    })
  }


  // 修改
  const updateSpot = async (
    id: number,
    payload: SpotPayload,
    languageCode: string
  ): Promise<ApiResponse<Spot>> => {

    const { $api } = useNuxtApp()

    return $api<ApiResponse<Spot>>(`${BASE}/${id}?languageCode=${languageCode}`, {
      method: 'PUT',
      body: payload
    })
  }


  // 刪除
  const deleteSpot = async (
    id: number,
    languageCode: string
  ): Promise<ApiResponse<null>> => {

    const { $api } = useNuxtApp()

    return $api<ApiResponse<null>>(`${BASE}/${id}?languageCode=${languageCode}`, {
      method: 'DELETE'
    })
  }


  return {
    fetchSpotList,
    fetchSpotInit,
    createSpot,
    updateSpot,
    deleteSpot
  }
}