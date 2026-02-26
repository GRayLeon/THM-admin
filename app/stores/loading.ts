import { defineStore } from "pinia";
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref<boolean>(false);

  function startLoad() {
    isLoading.value = true;
  }

  function endLoad() {
    isLoading.value = false;
  }

  return {
    isLoading,
    startLoad,
    endLoad
  }
})