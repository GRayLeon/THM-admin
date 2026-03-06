import type { IndexData } from '@/models/index.model'
import type { Theme } from '~/models/theme.model'
import type { Role } from '@/models/role.model'
import type { User } from '@/models/user.model'
import type { ActivityLogDto } from '@/models/activity-log.model'
import type {
  Spot,
  SectionTypes
} from '@/models/spot.model'
import type { ApiResponse } from '@/types/api-response'

export const mockIndexData: IndexData = {
  id: 1,
  homeCarousel: [
    'https://picsum.photos/600/400?1',
    'https://picsum.photos/600/400?2'
  ],
  homeIntro: '歡迎來到淡水古蹟博物館，這裡有豐富的歷史文化...',
  phone: '02-2623-1001',
  address: '新北市淡水區中正路1號',
  email: 'info@tshs.ntpc.gov.tw',
  facebookUrl: 'https://www.facebook.com/tshs',
  instagramUrl: 'https://www.instagram.com/tshs'
}


export const mockThemes: Theme[] = [
  {
    id: 1,
    name: '歷史建築',
    slug: 'historic-buildings',
    sortOrder: 10,
    description: '介紹淡水地區的歷史建築',
    imageUrl: 'https://picsum.photos/600/400?1'
  },
  {
    id: 2,
    name: '藝術文化',
    slug: 'arts-culture',
    sortOrder: 20,
    description: '展示淡水的藝術文化特色',
    imageUrl: 'https://picsum.photos/600/400?2'
  },
  {
    id: 3,
    name: '自然生態',
    slug: 'nature-ecology',
    sortOrder: 30,
    description: '探索淡水地區的自然生態環境',
    imageUrl: 'https://picsum.photos/600/400?3'
  }
]

export const mockUsers: User[] = [
  {
    id: 1,
    account: 'admin',
    status: 'ACTIVE',
    roleCode: 'ADMIN',
    roleName: '系統管理員'
  },
  {
    id: 2,
    account: 'test01',
    status: 'ACTIVE',
    roleCode: 'USER',
    roleName: '一般使用者'
  }
]

export let mockRoles: Role[] = [
  {
    code: 'ADMIN',
    name: '管理員',
    description: '所有權限的管理員',
    functions: [
      { code: 'HOME_MGMT', name: '首頁管理' },
      { code: 'SPOT_MGMT', name: '地點管理' },
      { code: 'THEME_MGMT', name: '分類管理' },
      { code: 'USER_MGMT', name: '帳號管理' },
      { code: 'ROLE_MGMT', name: '角色管理' }
    ]
  },
  {
    code: 'USER',
    name: '一般使用者',
    description: '可以編輯內容',
    functions: [
      { code: 'HOME_MGMT', name: '首頁管理' },
      { code: 'SPOT_MGMT', name: '地點管理' }
    ]
  }
]

export const mockActivityLogs: ActivityLogDto[] = [
  {
    id: 125,
    userId: 1,
    account: 'admin',
    ipAddress: '192.168.1.100',
    action: 'LOGIN',
    description: '使用者登入系統',
    createdAt: '2026-02-23 14:30:15'
  },
  {
    id: 124,
    userId: 1,
    account: 'admin',
    ipAddress: '192.168.1.100',
    action: 'UPDATE_THEME',
    description: '更新主題：歷史建築',
    createdAt: '2026-02-23 14:25:30'
  },
  {
    id: 123,
    userId: 1,
    account: 'admin',
    ipAddress: '192.168.1.100',
    action: 'CREATE_THEME',
    description: '新增主題：自然生態',
    createdAt: '2026-02-23 14:20:45'
  }
]

// Section Types Mock

export const mockSectionTypes: SectionTypes = {
  parents: [
    {
      key: 'TITLE',
      label: '標題',
      children: [
        { key: 'h1', label: 'H1 標題' },
        { key: 'h2', label: 'H2 標題' },
        { key: 'h3', label: 'H3 標題' }
      ]
    },
    {
      key: 'IMAGE',
      label: '圖片',
      children: [
        { key: 'SINGLE_IMAGE', label: '單張圖片' },
        { key: 'DOUBLE_IMAGE', label: '雙張圖片' },
        { key: 'CAROUSEL', label: '輪播圖' }
      ]
    },
    {
      key: 'TEXT_IMAGE',
      label: '圖文排版',
      children: [
        { key: 'LEFT_IMAGE_RIGHT_TEXT', label: '左圖右文' },
        { key: 'LEFT_TEXT_RIGHT_IMAGE', label: '左文右圖' }
      ]
    },
    {
      key: 'CONTENT',
      label: '內容',
      children: [
        { key: 'EDITOR_HTML', label: '富文字編輯器' },
        { key: 'QUOTE', label: '引用文字' },
        { key: 'TEXT_LINK', label: '文字連結' },
        { key: 'VIDEO', label: '影片' }
      ]
    }
  ]
}


// spot mock

export const mockSpots: Spot[] = [
  {
    id: 1,
    name: '陽明山國家公園',
    themeId: 1,
    status: 'PUBLISHED',
    imageUrl: 'https://picsum.photos/600/400?1',
    latitude: 25.1667,
    longitude: 121.5654,
    panoramaUrl: '',
    totalClicks: 152,
    createdAt: '2026-02-20T10:00:00',
    updatedAt: '2026-02-23T14:00:00',
    updatedUser: 1,
    sections: [
      {
        id: 1,
        sectionType: 'h1',
        sortOrder: 1,
        contents: [
          {
            id: 1,
            title: '陽明山國家公園',
            sortOrder: 1
          }
        ]
      },
      {
        id: 2,
        sectionType: 'SINGLE_IMAGE',
        sortOrder: 2,
        contents: [
          {
            id: 2,
            url: 'https://picsum.photos/800/400?2',
            caption: '陽明山風景',
            sortOrder: 1
          }
        ]
      },
      {
        id: 3,
        sectionType: 'EDITOR_HTML',
        sortOrder: 3,
        contents: [
          {
            id: 3,
            bodyContent: '<p>陽明山以火山地形與溫泉聞名，是台北近郊著名景點。</p>',
            sortOrder: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '淡水老街',
    themeId: 2,
    status: 'DRAFT',
    imageUrl: 'https://picsum.photos/600/400?3',
    latitude: 25.1695,
    longitude: 121.4440,
    panoramaUrl: '',
    totalClicks: 88,
    createdAt: '2026-02-18T09:30:00',
    updatedAt: '2026-02-22T16:45:00',
    updatedUser: 1,
    sections: [
      {
        id: 4,
        sectionType: 'h2',
        sortOrder: 1,
        contents: [
          {
            id: 4,
            title: '淡水老街介紹',
            sortOrder: 1
          }
        ]
      },
      {
        id: 5,
        sectionType: 'LEFT_IMAGE_RIGHT_TEXT',
        sortOrder: 2,
        contents: [
          {
            id: 5,
            url: 'https://picsum.photos/400/300?4',
            sortOrder: 1
          },
          {
            id: 6,
            bodyContent: '淡水老街以阿給、魚丸湯聞名，是熱門觀光地。',
            sortOrder: 2
          }
        ]
      }
    ]
  }
]

export function mockResponse<T>(data: T, message = '操作成功'): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  }
}

export function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}