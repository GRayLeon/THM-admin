<script setup lang="ts">
  import LanguageSwitch from '@/components/common/LanguageSwitch.vue';

  definePageMeta({
    layout: 'admin'
  })

</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row w-full border-b text-xl font-bold py-4 justify-between">
      <span>景點管理</span>
      <div class="flex flex-row gap-2">
        <LanguageSwitch></LanguageSwitch>
        <UButton class="cursor-pointer" @click="navigateTo('/spots/create')">新增景點</UButton>
      </div>
    </div>
    <SpotList></SpotList>
  </div>
</template>