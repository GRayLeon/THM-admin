import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {

  const lan = ref<'zh-TW' | 'en-US'>('zh-TW')

  const options = [
    { label: '中文', value: 'zh-TW' },
    { label: 'English', value: 'en-US' }
  ]

  const setLanguage = (value: 'zh-TW' | 'en-US') => {
    lan.value = value
  }

  return {
    lan,
    options,
    setLanguage
  }

})