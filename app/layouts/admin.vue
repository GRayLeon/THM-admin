<script setup lang="ts">
import SideBar from '~/components/layout/SideBar.vue';
</script>
<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-row justify-between w-full p-4 border-b sticky top-0 bg-black z-50">
      <span>THM ADMIN</span>
      <span>前台網頁</span>
    </div>
    <div class="flex flex-row flex-1">
      <div class="flex flex-col p-8 border-r">
        <SideBar></SideBar>
      </div>
      <div class="flex-1 flex flex-col items-center px-8 py-16">
        <div class="max-w-5xl">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>