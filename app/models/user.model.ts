export type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface User {
  id: number
  account: string
  status: UserStatus
  roleCode: string
  roleName: string
}

// Request DTO

export interface CreateUserPayload {
  account: string
  password: string
  roleCode: string
}

export interface UpdateUserPayload {
  roleCode?: string
  password?: string
}