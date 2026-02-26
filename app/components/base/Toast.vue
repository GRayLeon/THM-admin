<script setup lang="ts">
  import { useToastStore } from '@/stores/taost'
  const toast = useToastStore();
</script>

<template>

  <div class="toastArea">
    <Transition name="slideTop">
      <div v-if="toast.visible" :class="['toast', toast.type]">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .toastArea {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 0;
  }
  .toast {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
  }
  .toast.success { background-color: #4caf50; }
  .toast.error { background-color: #f44336; }
  .toast.loading { background-color: #2196f3; }

  .slideTop-enter-active,
  .slideTop-leave-active {
    transition: .3s;
  }

  .slideTop-enter-to,
  .slideTop-leave-from {
    opacity: 1;
    top: 0;
  }

  .slideTop-enter-from,
  .slideTop-leave-to {
    opacity: 0;
    top: 100px;
  }

</style>