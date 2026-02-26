<script setup lang="ts">
  import { useLoadingStore } from '@/stores/loading';
  import { storeToRefs } from 'pinia'
  
  const loadingStore = useLoadingStore();
  const { isLoading } = storeToRefs(loadingStore);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isLoading"
      class="loading">
      <span>loading...</span>
    </div>
  </Transition>
</template>

<style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 18px;
    background-color: rgba(0,0,0,.75);
    backdrop-filter: blur(10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: .6s;
  }

  .fade-enter-to,
  .fade-leave-form {
    opacity: 1;
  }

  .fade-enter-form,
  .fade-leave-to {
    opacity: 0;
  }

</style>