// models/spot.model.ts


export type SpotStatus = 'DRAFT' | 'PUBLISHED'

export type SectionType =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'SINGLE_IMAGE'
  | 'DOUBLE_IMAGE'
  | 'LEFT_IMAGE_RIGHT_TEXT'
  | 'LEFT_TEXT_RIGHT_IMAGE'
  | 'QUOTE'
  | 'TEXT_LINK'
  | 'EDITOR_HTML'
  | 'VIDEO'
  | 'CAROUSEL'

export interface Theme {
  id: number
  name: string
}


export interface SectionTypeChild {
  key: string
  label: string
}

export interface SectionTypeParent {
  key: string
  label: string
  children: SectionTypeChild[]
}

export interface SectionTypes {
  parents: SectionTypeParent[]
}

export interface SectionContent {
  id?: number
  url?: string | null
  caption?: string | null
  title?: string | null
  subtitle?: string | null
  bodyContent?: string | null
  sortOrder?: number
}

export interface Section {
  id?: number
  sectionType: SectionType
  sortOrder: number
  contents: SectionContent[]
}

export interface Spot {
  id: number
  name: string
  themeId: number
  status: SpotStatus
  imageUrl: string | null
  latitude: number | null
  longitude: number | null
  panoramaUrl: string | null
  totalClicks: number
  createdAt: string
  updatedAt: string
  updatedUser: string
  illustrationUrl: string,
  illustrationTitle: string,
  illustrationSubtitle: string,
  illustrationBody: string,
  sections: Section[]
}

export interface SpotDetailResponseData {
  themes: Theme[]
  sectionTypes: SectionTypes
  spot: Spot | null
}

export interface SpotPayload {
  id?: number
  name: string
  themeId: number
  status: SpotStatus
  latitude: number | null
  longitude: number | null
  panoramaUrl: string | null
  imageUrl: string | null
  illustrationUrl: string | null
  illustrationTitle: string | null
  illustrationSubtitle: string | null
  illustrationBody: string | null
  sections: SectionPayload[]
  tempImage: File | null
  tempIllustrationImage: File | null
}

export type tempFile = {
  id: string
  file?: File | null
}

export interface SectionPayload {
  id?: number
  sectionType: SectionType
  sortOrder: number
  contents: SectionContentPayload[]
  tempFiles?: tempFile[]
}

export interface SectionContentPayload {
  id?: number
  url?: string | null
  caption?: string | null
  title?: string | null
  subtitle?: string | null
  bodyContent?: string | null
  sortOrder?: number
}

export interface SpotListItem {
  id: number
  name: string
  imageUrl: string | null
}

export interface SpotListResponseData {
  themes: Theme[]
  spots: SpotListItem[]
}