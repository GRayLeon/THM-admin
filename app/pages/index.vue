<script setup lang="ts">
  import LanguageSwitch from '@/components/common/LanguageSwitch.vue'
  
  definePageMeta({
    layout: 'admin'
  })
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between w-full border-b text-xl font-bold py-4">
      <span>首頁管理</span>
      <LanguageSwitch />
    </div>
    <IndexManage></IndexManage>
  </div>
</template>