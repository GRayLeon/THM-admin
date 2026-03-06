export interface ActivityLogDto {
  id: number
  userId: number
  account: string
  ipAddress: string
  action: string
  description: string
  createdAt: string
}

export interface ActivityLogPageDto {
  content: ActivityLogDto[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}