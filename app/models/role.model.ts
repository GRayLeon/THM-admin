// models/role.model.ts
export interface RoleFunction {
  code: string
  name: string
}

export interface Role {
  code: string
  name: string
  description?: string
  functions: RoleFunction[]
}

export interface RoleUI extends Omit<Role, 'functions'> {
  functions: string[],
  isNew: boolean
}

export interface CreateRolePayload {
  code: string
  name: string
  description?: string
  functionCodes: string[]
}

export interface UpdateRolePayload {
  name: string
  description?: string
  functionCodes: string[]
}