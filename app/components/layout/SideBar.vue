<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: '首頁管理',
      icon: 'i-lucide-house',
      to: '/admin'
    },
    {
      label: '地點管理',
      icon: 'i-lucide-map-pin',
      to: '/admin/position'
    },
    {
      label: '分類管理',
      icon: 'i-lucide-map',
      to: '/admin/category',
    },
    {
      label: '帳號管理',
      icon: 'i-lucide-user',
      to: '/admin/users',
    },
    {
      label: '角色管理',
      icon: 'i-lucide-group',
      to: '/admin/roles',
    }
  ]
])
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
