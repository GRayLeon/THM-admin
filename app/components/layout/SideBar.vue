<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia';

const { fetchProfile } = useAuthStore()
const authstore = storeToRefs(useAuthStore())
const { user } = authstore

const { roles, reload } = useRoles()

const roleFunctions = computed(() => {
  if (user.value && user.value.roleCode) {
    return roles.value.find(r => r.code === user.value!.roleCode)?.functions
  }
})

onMounted( async () => {
  await fetchProfile()
  await reload()
})

type AdminMenuItem = NavigationMenuItem & {
  functionId?: string
  roles?: string[]
}

const allItems: AdminMenuItem[] = [
  {
    label: '首頁管理',
    icon: 'i-lucide-house',
    to: '/',
    functionId: 'HOME_MGMT'
  },
  {
    label: '景點管理',
    icon: 'i-lucide-map-pin',
    to: '/spots',
    functionId: 'SPOT_MGMT'
  },
  {
    label: '主題管理',
    icon: 'i-lucide-map',
    to: '/themes',
    functionId: 'THEME_MGMT'
  },
  {
    label: '使用者管理',
    icon: 'i-lucide-user',
    to: '/users'
  },
  {
    label: '角色管理',
    icon: 'i-lucide-group',
    to: '/roles'
  }
]


const items = computed<NavigationMenuItem[][]>(() => {
  if (!user.value) return [[]]

  const userRole = user.value.roleCode

  if (userRole === 'ADMIN') {
    return [allItems]
  }

  const allowedFunctionIds =
    roleFunctions.value?.map(f => f.code) ?? []

  const filtered = allItems.filter(item =>
    item.functionId &&
    allowedFunctionIds.includes(item.functionId)
  )

  return [filtered]
})
</script>

<template>
  {{ roleFunctions }}
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
