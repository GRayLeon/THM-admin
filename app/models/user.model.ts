export type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface User {
  id: number
  fullName: string
  account: string
  email: string | null
  status: UserStatus
  roleCode: string
  roleName: string
}

// Request DTO

export interface CreateUserPayload {
  fullName: string
  account: string
  password: string
  email?: string
  roleCode: string
}

export interface UpdateUserPayload {
  roleCode?: string
  password?: string
}