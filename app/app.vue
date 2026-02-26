<script setup lang="ts">
  import Toast from '@/components/base/Toast.vue'
  import Loading from '@/components/base/Loading.vue';
</script>

<template>
  <div class="h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
    <Loading />
  </div>
</template>