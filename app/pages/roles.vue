<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-full border-b text-xl font-bold py-4"><span>角色管理</span></div>
    <RoleList></RoleList>
  </div>
</template>