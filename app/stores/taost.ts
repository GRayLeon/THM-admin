import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref<string | null>(null);
  const type = ref<'success' | 'error'>('success');
  const visible = ref<boolean>(false);
  
  function show(msg: string, t: 'success' | 'error' = 'success') {
    message.value = msg;
    type.value = t;
    visible.value = true;

    setTimeout(() => {
      hide();
    }, 3000)
  }

  function hide() {
    visible.value = false;
  }

  return { message, type, visible, show, hide }
})