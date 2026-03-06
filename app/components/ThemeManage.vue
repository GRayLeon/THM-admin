<script setup lang="ts">
  const languageStore = useLanguageStore()
  const { lan } = storeToRefs(languageStore)
  
  watch(lan, () => {
    reload()
  })
  
  import { updateThemeSchema } from '~/schemas/theme.schema';

  const { formStates, removeImage, saveForm, reload } = useThemes()

  const onSubmit = async (formStates: ThemeFormState[]) => {
    await saveForm(formStates)
    reload()
  }

  onMounted( async () => {
    await reload()
  })
</script>

<template>
  <UForm
    class="flex flex-col gap-16"
    :schema="updateThemeSchema"
    :state="formStates"
    @submit="() => onSubmit(formStates)"
  >
    <div class="flex flex-col gap-4" v-for="formState in formStates">
      <div class="w-full border-b border-accented text-lg font-bold py-4">{{ formState.name }}</div>
      <div class="flex flex-col gap-12">
        <UFormField orientation="horizontal">
          <div class="flex flex-row items-start  gap-4">
            <div class="w-40 text-md pt-2">分類圖片</div>
            <div class="flex flex-row items-start gap-4 w-3xl">
              <div class="flex flex-col gap-4 w-3xl">
                <div v-if="formState.imageUrl" class="relative">
                  <UButton
                    icon="i-heroicons-x-mark-20-solid"
                    class="cursor-pointer absolute top-1 right-1"
                    @click="removeImage(formState.id)"
                  />
                  <img
                    class="w-full rounded-lg"
                    :src="`https://cdn.thm720.com/${formState.imageUrl}`"
                  />
                </div>
                <UFileUpload
                  v-else
                  class="w-full min-h-60"
                  v-model="formState.tempImage"
                />
              </div>
            </div>
          </div>
        </UFormField>
        <UFormField orientation="horizontal">
          <div class="flex flex-row items-start  gap-4">
            <div class="w-40 text-md pt-2">敘述文字</div>
            <div class="flex flex-row items-start gap-4 w-3xl">
              <UTextarea class="w-full" v-model="formState.description" :rows="8"></UTextarea>
            </div>
          </div>
        </UFormField>
      </div>
    </div>
    <div class="flex flex-row justify-end">
      <UButton class="w-full justify-center cursor-pointer" type="submit">儲存</UButton>
    </div>
  </UForm>
</template>