import type {
  SectionType,
  SpotPayload,
  SpotListResponseData,
  SpotDetailResponseData 
} from '@/models/spot.model'
import { 
  useSpotService
} from '@/services/spot.service'

const { uploadImage } = useUpload()
const {
  fetchSpotList,
  fetchSpotInit,
  createSpot,
  updateSpot,
  deleteSpot
} = useSpotService()

type SpotFormState = SpotPayload & {
  tempIllustrationImage: File | null
  tempImage: File | null
}

export function useSpots() {

  const formState = ref<SpotFormState>({
    name: '',
    themeId: 1,
    status: 'PUBLISHED',
    imageUrl: '',
    latitude: 0,
    longitude: 0,
    panoramaUrl: '',
    illustrationUrl: '',
    illustrationTitle: '',
    illustrationSubtitle: '',
    illustrationBody: '',
    sections: [],
    tempIllustrationImage: null,
    tempImage: null
  })

  const spots = ref<SpotListResponseData>({
    themes: [],
    spots: []
  })

  const spot = ref<SpotDetailResponseData>({
    themes: [],
    sectionTypes: {
      parents: []
    },
    spot: null
  })

  const sectionTypeMap: Record<SectionType, string> = {
    H1: '標題 H1',
    H2: '標題 H2',
    H3: '標題 H3',
    SINGLE_IMAGE: '單張圖片',
    DOUBLE_IMAGE: '雙張圖片',
    LEFT_IMAGE_RIGHT_TEXT: '左圖右文',
    LEFT_TEXT_RIGHT_IMAGE: '左文右圖',
    QUOTE: '引用文字',
    TEXT_LINK: '文字連結',
    EDITOR_HTML: 'HTML 編輯器',
    VIDEO: '影片',
    CAROUSEL: '輪播'
  }

  const sectionTypeOptions = computed(() =>
    Object.entries(sectionTypeMap).map(([value, label]) => ({
      value,
      label
    }))
  )

  const statusOptions = ref([
    { value: 'DRAFT', label: '草稿' },
    { value: 'PUBLISHED', label: '已發佈' }
  ])

  const tempMainImage = ref<File | null>(null)

  const handleUploadImage = async (payload: SpotPayload) => {
    if (payload.tempImage) {
      const mainImageUrl = await uploadImage(
        payload.tempImage,
        'spotMainImage'
      )

      payload.imageUrl = mainImageUrl
      payload.tempImage = null
    }

    if (payload.tempIllustrationImage) {
      const illustrationImageUrl = await uploadImage(
        payload.tempIllustrationImage,
        'spotIllustrationImage'
      )

      payload.illustrationUrl = illustrationImageUrl
      payload.tempIllustrationImage = null
    }

    for (const section of payload.sections) {
      if (!section.tempFiles) continue

      for (let i = 0; i < section.contents.length; i++) {
        const content = section.contents[i]
        const tempFile = section.tempFiles[i]

        if (!tempFile?.file) continue

        const imageUrl = await uploadImage(
          tempFile.file,
          'spotContentImage'
        )

        content!.url = imageUrl
      }
    }

    return payload
  }

  const tempSecitonType = ref<SectionType>('H1')

  const imageSectionMap: Partial<Record<SectionType, number>> = {
    SINGLE_IMAGE: 1,
    DOUBLE_IMAGE: 2,
    LEFT_IMAGE_RIGHT_TEXT: 1,
    LEFT_TEXT_RIGHT_IMAGE: 1,
    CAROUSEL: 1
  }

  const createContent = (order: number) => ({
    url: '',
    caption: '',
    title: '',
    subTitle: '',
    bodyContent: '',
    sortOrder: order
  })

  const addTempFile = (id: number) => {
    const sections = formState.value.sections
    if (!sections) return

    const section = sections[id]
    if (!section) return

    section.tempFiles?.push({
      id: `newFile_${id}_${section.contents.length + 1}`,
      file: null as File | null
    })
  }

  const addCarousel = (order: number, id: number) => {
    const section = formState.value.sections.find(item => item.sortOrder === order)
    section?.contents.push(createContent(order))
    addTempFile(id)
  }

  const removeImage = (sectionIndex: number, contentIndex: number) => {
    const section = formState.value.sections[sectionIndex]
    if (!section) return

    const content = section.contents[contentIndex]
    if (!content) return

    // 1️⃣ 清除已儲存的圖片 url
    content.url = ''

    // 2️⃣ 如果沒有 tempFiles 陣列就補上
    if (!section.tempFiles) {
      section.tempFiles = []
    }

    // 3️⃣ 確保對應 index 有 tempFile
    if (!section.tempFiles[contentIndex]) {
      section.tempFiles[contentIndex] = {
        id: `newFile_${section.sortOrder}_${contentIndex + 1}`,
        file: null
      }
    }

    // 4️⃣ 把 file 清空（避免殘留）
    section.tempFiles[contentIndex].file = null
  }

  const removeMainImage = () => {
    formState.value.imageUrl = ''
    formState.value.tempImage = null
  }

  const removeIllustrationImage = () => {
    formState.value.illustrationUrl = ''
    formState.value.tempIllustrationImage = null
  }

  const addSection = (sectionType: SectionType) => {
    const sections = formState.value.sections
    if (!sections) return

    const sectionIndex = sections.length + 1

    const imageCount = imageSectionMap[sectionType] ?? 0
    const hasImage = imageCount > 0

    const contents = Array.from(
      { length: hasImage ? imageCount : 1 },
      (_, i) => createContent(i + 1)
    )

    const sectionData: any = {
      sectionType,
      sortOrder: sectionIndex,
      contents
    }

    if (hasImage) {
      sectionData.tempFiles = Array.from(
        { length: imageCount },
        (_, i) => ({
          id: `newFile_${sectionIndex}_${i + 1}`,
          file: null as File | null
        })
      )
    }

    sections.push(sectionData)
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = formState.value.sections

    if (direction === 'up' && index > 0) {
      const temp = sections[index]!
      sections.splice(index, 1)
      sections.splice(index - 1, 0, temp)
    }

    if (direction === 'down' && index < sections.length - 1) {
      const temp = sections[index]!
      sections.splice(index, 1)
      sections.splice(index + 1, 0, temp)
    }

    sections.forEach((s, i) => {
      s.sortOrder = i + 1
    })
  }

  const removeSection = (index: number) => {
    const sections = formState.value.sections
    if (!sections || !sections[index]) return

    // 1️⃣ 移除該 section
    sections.splice(index, 1)

    // 2️⃣ 重新排序 sortOrder
    sections.forEach((section, i) => {
      section.sortOrder = i + 1
    })
  }

  const saveForm = async (formState: SpotFormState , type: 'create' | 'edit', id?: number) => {
    load.startLoad()

    try {
      if (type === 'create') {
        await addSpot(formState)
      } else {
        await editSpot(id!, formState)
      }
    } catch (err: any) {
      handleValidationError(err)
      return false
    } finally {
      load.endLoad()
    }
  }

  const toast = useToastStore()
  const load = useLoadingStore()

  // 取得列表
  const getSpots = async (categoryId: number) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const res = await fetchSpotList(categoryId, lan.value)
      spots.value = res.data
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得使用者失敗', 'error')
    } finally {
      load.endLoad()
    }
  }

  // 單筆取得
  const getSpot = async (id: number) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const res = await fetchSpotInit(id, lan.value)
      spot.value = res.data
      if (spot.value.spot) {
        formState.value = {
          ...spot.value.spot,
          tempImage: null,
          tempIllustrationImage: null
        }
      }
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得使用者失敗', 'error')
    } finally {
      load.endLoad()
    }
  }

  // 新增
  const addSpot = async (payload: SpotPayload) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      payload = await handleUploadImage(payload)

      const res = await createSpot(payload, lan.value)
      spots.value.spots.push(res.data)
      toast.show(res.message, 'success')
      return true
    } catch (err: any) {
      handleValidationError(err)
      return false
    } finally {
      load.endLoad()
    }
  }


  // 修改
  const editSpot = async (id: number, payload: SpotPayload) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      payload = await handleUploadImage(payload)

      const res = await updateSpot(id, payload, lan.value)
      const index = spots.value.spots.findIndex(u => u.id === id)
      if (index !== -1) {
        spots.value.spots[index] = res.data
      }

      toast.show(res.message, 'success')
      return true
    } catch (err: any) {
      handleValidationError(err)
      return false
    } finally {
      load.endLoad()
    }
  }

  // 刪除
  const removeSpot = async (id: number) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const res = await deleteSpot(id, lan.value)
      spots.value.spots = spots.value.spots.filter(u => u.id !== id)

      toast.show(res.message, 'success')
      return true
    } catch (err: any) {
      toast.show(err?.data?.message || '刪除失敗', 'error')
      return false
    } finally {
      load.endLoad()
    }
  }

  // 驗證錯誤處理
  const handleValidationError = (err: any) => {
    if (err?.data?.data) {
      const messages = Object.values(err.data.data).join('\n')
      toast.show(messages, 'error')
    } else {
      toast.show(err?.data?.message || '操作失敗', 'error')
    }
  }

  return {
    spot,
    spots,
    sectionTypeOptions,
    statusOptions,
    tempSecitonType,
    removeImage,
    removeMainImage,
    removeIllustrationImage,
    moveSection,
    addSection,
    removeSection,
    addCarousel,
    formState,
    tempMainImage,
    reload: getSpots,
    init: getSpot,
    saveForm,
    removeSpot,
  }
}