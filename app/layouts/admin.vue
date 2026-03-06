<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue';
import { useAuthStore } from '@/stores/auth.store';

const { logout } = useAuthStore()

</script>
<template>
  <div class="flex flex-col h-full relative">
    <div class="flex flex-row justify-between w-full p-4 border-b sticky top-0 backdrop-blur-md z-50">
      <span>THM 720｜淡水古蹟博物館導覽後台</span>
      <div class="flex flex-row gap-1">
        <a  class="underline cursor-pointer">前台</a>
        <span @click="logout()" class="underline cursor-pointer">登出</span>
      </div>
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