<script setup lang="ts">
  const languageStore = useLanguageStore()
  const { lan } = storeToRefs(languageStore)
  
  watch(lan, () => {
    init(parseInt(spotId.value))
  })

  import type { SectionType } from '@/models/spot.model'
  const { 
    spot, 
    sectionTypeOptions, tempSecitonType, 
    moveSection, addSection, removeSection,
    removeImage, removeMainImage, removeIllustrationImage,
    addCarousel,
    formState,
    tempMainImage,
    init, saveForm
  } = useSpots()
  
  const spotId = ref('')
  const spotData = computed(() => spot.value.spot)

  const { themeOptions, reload } = useThemes()
  const filterThemeOptions = computed(() => {
    return themeOptions.value.filter(o => o.value !== 0)
  })

  const isHeading = (type: SectionType) =>
    ['H1', 'H2', 'H3'].includes(type)

  const isImage = (type: SectionType) =>
    ['SINGLE_IMAGE', 'DOUBLE_IMAGE'].includes(type)

  const isImageText = (type: SectionType) =>
    ['LEFT_IMAGE_RIGHT_TEXT', 'LEFT_TEXT_RIGHT_IMAGE'].includes(type)

  const isEditor = (type: SectionType) =>
    type === 'EDITOR_HTML'

  const isQuote = (type: SectionType) =>
    type === 'QUOTE'

  const isVideo = (type: SectionType) =>
    type === 'VIDEO'

  const isCarousel = (type: SectionType) =>
    type === 'CAROUSEL'

  const goSpotList = () => {
    navigateTo('/spots')
  }

  const onSubmit = async (formState: any) => {
    await saveForm(formState, spotId.value ? 'edit' : 'create', spotId.value ? parseInt(spotId.value) : undefined)
    if (spotId.value) init(parseInt(spotId.value))
    else goSpotList()
  }

  onMounted( async () => {
    await reload()
    const currentId = useRoute().params.spotId
    if (typeof currentId === 'string') {
      spotId.value = currentId
      init(parseInt(spotId.value))
    }
  })
</script>
<template>

  <div class="flex flex-col gap-4 items-start">
    <UButton
      icon="i-heroicons-arrow-left-20-solid"
      variant="outline"
      class="cursor-pointer"
      @click="goSpotList"
    >
      返回上頁
    </UButton>
    <UForm @submit="() => onSubmit(formState)">
      <div class="flex flex-col gap-16">
        <div v-if="spotId" class="flex flex-col gap-2 px-8 py-6 rounded-md border border-accented">
          <div class="flex flex-row gap-4">
            <div class="w-40 text-md">發布日期</div>
            <div class="flex flex-col gap-4 w-3xl">{{ spotData?.createdAt }}</div>
          </div>
          <div class="flex flex-row gap-4">
            <div class="w-40 text-md">最後修改日期</div>
            <div class="flex flex-col gap-4 w-3xl">{{ spotData?.updatedAt }}</div>
          </div>
          <div class="flex flex-row gap-4">
            <div class="w-40 text-md">最後修改帳號</div>
            <div class="flex flex-col gap-4 w-3xl">{{ spotData?.updatedUser }}</div>
          </div>
          <div class="flex flex-row gap-4">
            <div class="w-40 text-md">點擊次數</div>
            <div class="flex flex-col gap-4 w-3xl">{{ spotData?.totalClicks }}</div>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="w-full border-b border-accented text-lg font-bold py-4">主要內容</div>
          <div class="flex flex-col gap-12">
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4 item">
                <div class="w-40 text-md pt-2">景點ID</div>
                <div class="flex flex-row gap-4 w-3xl items-center pt-2">
                  {{ spotId }}
                </div>
              </div>
            </UFormField>
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">景點名稱</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <UInput size="xl" v-model="formState.name"></UInput>
                </div>
              </div>
            </UFormField>
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">分類</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <USelect size="xl" v-model="formState.themeId" :items="filterThemeOptions"></USelect>
                </div>
              </div>
            </UFormField>
            <!-- <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">狀態</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <USelect size="xl" v-model="formState.status" :items="statusOptions"></USelect>
                </div>
              </div>
            </UFormField> -->
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">景點圖片</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <div v-if="formState.imageUrl" class="relative">
                    <UButton
                      icon="i-heroicons-x-mark-20-solid"
                      class="cursor-pointer absolute top-1 right-1"
                      @click="removeMainImage"
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
            </UFormField>
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">景點座標</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <!-- <iframe class="borderrelative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-3 py-2 bg-default ring ring-inset ring-accented disabled:bg-default focus:ring-2 focus:ring-inset focus:ring-primary" id="map"></iframe> -->
                  <UInput size="xl" v-model="formState.latitude"></UInput>
                  <UInput size="xl" v-model="formState.longitude"></UInput>
                </div>
              </div>
            </UFormField>
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">720連結</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <UInput size="xl" v-model="formState.panoramaUrl!"></UInput>
                </div>
              </div>
            </UFormField>
            <UFormField orientation="horizontal">
              <div class="flex flex-row gap-4">
                <div class="w-40 text-md pt-2">插圖</div>
                <div class="flex flex-col gap-4 w-3xl">
                  <div v-if="formState.illustrationUrl" class="relative">
                    <UButton
                      icon="i-heroicons-x-mark-20-solid"
                      class="cursor-pointer absolute top-1 right-1"
                      @click="removeIllustrationImage"
                    />
                    <img
                      class="w-full rounded-lg"
                      :src="`https://cdn.thm720.com/${formState.illustrationUrl}`"
                    />
                  </div>
                  <UFileUpload
                    v-else
                    class="w-full min-h-60"
                    v-model="formState.tempIllustrationImage"
                  />
                  <UInput size="xl" v-model="formState.illustrationTitle!" placeholder="插圖標題"></UInput>
                  <UInput size="xl" v-model="formState.illustrationBody!" placeholder="插圖說明"></UInput>
                </div>
              </div>
            </UFormField>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="w-full border-b border-accented text-lg font-bold py-4">詳細內容</div>
          <div class="flex flex-col gap-12">
            <div v-for="(section, sectionIdx) in formState.sections">
              <UFormField v-if="section.sectionType" orientation="horizontal">
                <div class="flex flex-row items-start gap-4">
                  <div class="w-40 text-md pt-2">{{ sectionTypeOptions.find(item => item.value === section.sectionType)!.label }}</div>
                  <div v-if="section.sectionType === 'H1' || section.sectionType === 'H2' || section.sectionType === 'H3'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="content in section.contents">
                      <UInput class="flex-1" size="xl" v-model="content.bodyContent!"></UInput>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'SINGLE_IMAGE' || section.sectionType === 'DOUBLE_IMAGE'"  class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="(content ,contentIdx) in section.contents">
                      <div v-if="content.url" class="relative">
                        <UButton icon="i-heroicons-x-mark-20-solid" class="cursor-pointer absolute top-1 right-1" @click="removeImage(sectionIdx, contentIdx)"></UButton>
                        <img class="w-full rounded-lg overflow-hidden" :src="`https://cdn.thm720.com/${content.url}`" alt="">
                      </div>
                      <UFileUpload
                        v-else
                        class="w-full min-h-60 object-contain"
                        v-model="section.tempFiles![contentIdx]!.file"
                      />
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'LEFT_IMAGE_RIGHT_TEXT' || section.sectionType === 'LEFT_TEXT_RIGHT_IMAGE'" class="flex-1 flex flex-col gap-4 w-3xl"> 
                    <div class="flex flex-col gap-4 w-full" v-for="(content ,contentIdx) in section.contents">
                      <div v-if="content.url" class="relative">
                        <UButton icon="i-heroicons-x-mark-20-solid" class="cursor-pointer absolute top-1 right-1" @click="removeImage(sectionIdx, contentIdx)"></UButton>
                        <img class="w-full rounded-lg overflow-hidden" :src="`https://cdn.thm720.com/${content.url}`" alt="">
                      </div>
                      <UFileUpload
                        v-else
                        class="w-full min-h-60 object-contain"
                        v-model="section.tempFiles![contentIdx]!.file"
                      />
                      <UTextarea class="w-full" :rows="8" v-model="content.bodyContent!"></UTextarea>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'EDITOR_HTML'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="content in section.contents">
                      <UTextarea class="flex-1" :rows="8" v-model="content.bodyContent!"></UTextarea>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'QUOTE'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="content in section.contents">
                      <UInput class="flex-1" size="xl" v-model="content.bodyContent!"></UInput>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'TEXT_LINK'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="content in section.contents">
                      <UInput class="flex-1" size="xl" v-model="content.bodyContent!"></UInput>
                      <UInput class="flex-1" size="xl" v-model="content.url!"></UInput>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'VIDEO'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="content in section.contents">
                      <UInput class="flex-1" size="xl" v-model="content.url!"></UInput>
                    </div>
                  </div>
                  <div v-else-if="section.sectionType === 'CAROUSEL'" class="flex-1 flex flex-col gap-4 w-3xl">
                    <div class="flex flex-row gap-4" v-for="(content ,contentIdx) in section.contents">
                      <div class="flex-1 flex flex-col gap-4"> 
                        <div v-if="content.url" class="relative">
                          <UButton icon="i-heroicons-x-mark-20-solid" class="cursor-pointer absolute top-1 right-1" @click="removeImage(sectionIdx, contentIdx)"></UButton>
                          <img class="w-full rounded-lg overflow-hidden" :src="`https://cdn.thm720.com/${content.url}`" alt="">
                        </div>
                        <UFileUpload
                          v-else
                          class="w-full min-h-60 object-contain"
                          v-model="section.tempFiles![contentIdx]!.file"
                        />
                        <UInput class="flex-1" size="xl" v-model="content.bodyContent!"></UInput>
                      </div>
                    </div>
                    <UButton class="cursor-pointer justify-center w-full" @click="addCarousel(section.sortOrder, sectionIdx)">新增圖片</UButton>
                  </div>
                  <div class="flex flex-row gap-1">
                    <UButton @click="moveSection(sectionIdx, 'down')" variant="outline" icon="i-heroicons-arrow-down-20-solid"></UButton>
                    <UButton @click="moveSection(sectionIdx, 'up')" variant="outline" icon="i-heroicons-arrow-up-20-solid"></UButton>
                    <UButton @click="removeSection(sectionIdx)" variant="outline" icon="i-heroicons-trash-20-solid"></UButton>
                  </div>
                </div>
              </UFormField>
            </div>
            <div class="flex flex-row gap-2">
              <USelect size="xl" class="flex-4" :items="sectionTypeOptions" v-model="tempSecitonType"></USelect>
              <UButton class="flex-1 justify-center" @click="addSection(tempSecitonType)">新增</UButton>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-end">
          <UButton class="w-full justify-center cursor-pointer" type="submit">{{ spotId !== '' ? '更新景點' : '新增景點' }}</UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>