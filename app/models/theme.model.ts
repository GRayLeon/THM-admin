export interface Theme {
  id: number
  name: string
  slug: string
  sortOrder: number
  description?: string
  imageUrl?: string
}

export interface UpdateThemePayload {
  name: string
  slug: string
  sortOrder: number
  description?: string
  imageUrl?: string
}

export interface BatchThemePayload {
  id: number
  data: UpdateThemePayload
}