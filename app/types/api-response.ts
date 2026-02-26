export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface ApiValidationError {
  success: false
  message: string
  data: Record<string, string>
  timestamp: string
}