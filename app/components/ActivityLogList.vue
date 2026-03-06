<script setup lang="ts">
  import { useActivityLogs } from '@/composables/useActivityLogs'

  const { activityLogs, getActivityLogs } = useActivityLogs();

  const route = useRoute()
  const userId = computed(() => {
    const id = route.params.userId
    if (typeof id === 'string') {
      return parseInt(id)
    } else {
      return null
    }
  })

  const goUserList = () => {
    navigateTo(`/users`)
  }

  onMounted(() => {
    if (!userId.value) return
    getActivityLogs(userId.value)
  })
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <UButton
      icon="i-heroicons-arrow-left-20-solid"
      variant="outline"
      class="cursor-pointer"
      @click="goUserList"
    >
      返回上頁
    </UButton>

    <div class="flex flex-row w-3xl py-4 border-b" v-for="activityLog in activityLogs.content" :key="activityLog.id">
      <div class="flex-1">{{ activityLog.createdAt }}</div>
      <div class="flex-1">{{ activityLog.ipAddress }}</div>
      <div class="flex-1">{{ activityLog.action }}</div>
    </div>
  </div>
</template>