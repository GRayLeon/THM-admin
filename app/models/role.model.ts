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
  functions: string[]
}

export interface RolePayload {
  name: string
  description?: string
  functionCodes: string[]
}