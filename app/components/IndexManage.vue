<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { updateIndexDataSchema } from '@/schemas/index.schema';
  const { formState, addImage, removeImage, saveForm, reload } = useIndex()

  const languageStore = useLanguageStore()
  const { lan } = storeToRefs(languageStore)
  
  watch(lan, () => {
    reload()
  })

  const onSubmit = async (formState: any) => {
    await saveForm(formState)
    reload()
  }

  onMounted( async () => {
    await reload()
  })
</script>

<template>
  <UForm
    :schema="updateIndexDataSchema"
    :state="formState"
    @submit="() => onSubmit(formState)"
  >
    <div class="flex flex-col gap-12">
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">首頁圖片</div>
          <div class="flex flex-col gap-4 w-3xl">
            <div v-for="(carousel, idx) in formState.homeCarousel">
              <div class="flex flex-col gap-4 w-3xl">
                <div v-if="carousel.url" class="relative">
                  <UButton
                    icon="i-heroicons-x-mark-20-solid"
                    class="cursor-pointer absolute top-1 right-1"
                    @click="removeImage(idx)"
                  />
                  <img
                    class="w-full rounded-lg"
                    :src="`https://cdn.thm720.com/${carousel.url}`"
                  />
                </div>
                <UFileUpload
                  v-else
                  class="w-full min-h-60"
                  v-model="carousel.tempImage"
                />
              </div>
            </div>
            <UButton class="cursor-pointer" :ui="{ base: 'justify-center' }" @click="addImage()">新增圖片</UButton>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">首頁文字</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UTextarea :rows="8" v-model="formState.homeIntro!"></UTextarea>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">電話</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl" v-model="formState.phone!"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">地址</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl" v-model="formState.address!"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">Email</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"v-model="formState.email!"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">facebook</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl" v-model="formState.facebookUrl!"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">instagram</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl" v-model="formState.instagramUrl!"></UInput>
          </div>
        </div>
      </UFormField>
      <div class="flex flex-row justify-end">
        <UButton class="w-full justify-center cursor-pointer" type="submit">儲存</UButton>
      </div>
    </div>
  </UForm>
</template>