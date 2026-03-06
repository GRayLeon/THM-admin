// Model
export interface IndexData {
  id: number | null
  homeCarousel: string[]
  homeIntro: string | null
  phone: string | null
  address: string | null
  email: string | null
  facebookUrl: string | null
  instagramUrl: string | null
}

// Payload
export interface IndexDataPayload {
  id?: number | null
  homeCarousel?: string[]
  homeIntro?: string | null
  phone?: string | null
  address?: string | null
  email?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
}