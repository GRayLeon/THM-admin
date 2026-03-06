<script setup lang="ts">
const languageStore = useLanguageStore()

const lan = computed({
  get: () => languageStore.lan,
  set: (val) => languageStore.setLanguage(val)
})
</script>

<template>
  <USelect
    :items="languageStore.options"
    v-model="lan"
    class="w-32"
  />
</template>