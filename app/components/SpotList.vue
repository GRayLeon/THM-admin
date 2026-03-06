<script setup lang="ts">
  const languageStore = useLanguageStore()
  const { lan } = storeToRefs(languageStore)
  
  watch(lan, () => {
    reload(categoryId.value)
  })

  const { spots, reload } = useSpots()
  const { themeOptions } = useThemes()

  const categoryId = ref(0)

  watch(categoryId, (id) => {
    reload(Number(id))
  })

  const goSpot = (id: number) => {
    navigateTo(`/spots/${id}`)
  }

  onMounted(async () => {
    categoryId.value = themeOptions.value[0]?.value ?? 0
    reload(Number(categoryId.value))
  })
</script>
<template>
  <USelect size="lg" :items="themeOptions" v-model="categoryId"></USelect>
  <div class="flex flex-row flex-wrap gap-4 w-3xl">
    <UCard class="w-[calc((100%-2rem)/3)]" v-for="spot in spots.spots" :key="spot.id">
      <template #header>
        <div class="flex flex-row gap-2 items-center">
          <span class="w-8 h-8 flex items-center justify-center border rounded-lg opacity-50">{{ spot.id }}</span>
          <span>{{ spot.name ?? '--'}}</span>
        </div>
      </template>
      <div class="w-full h-32 flex flex-col items-center justify-center border border-accented rounded-lg" v-if="!spot.imageUrl">
        <UIcon name="i-heroicons-puzzle-piece-20-solid" />
      </div>
      <img class="w-full h-32 object-cover rounded-lg" v-else :src="`https://cdn.thm720.com/${spot.imageUrl}`" />
      <template #footer>
        <UButton class="w-full justify-center cursor-pointer" @click="goSpot(spot.id)">編輯景點</UButton>
      </template>
    </UCard>
  </div>
</template>