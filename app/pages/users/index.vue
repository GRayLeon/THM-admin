<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-full border-b text-xl font-bold py-4">使用者管理</div>
    <UserList></UserList>
  </div>
</template>