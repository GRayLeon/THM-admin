import type { Theme, BatchThemePayload } from '@/models/theme.model'
import { 
  useThemeService
} from '@/services/theme.service'

const { uploadImage } = useUpload()
const {
  fetchThemes,
  updateAllThemes
} = useThemeService()

export type ThemeFormState = {
  id: number,
  name: string
  slug: string
  sortOrder: number
  description?: string
  imageUrl?: string
  tempImage: File | null
}

export interface tempFile {
  id: number
  file?: File | null
}

export function useThemes() {

  const formStates = ref<ThemeFormState[]>([])

  const themes = ref<Theme[]>([])

  const themeOptions = computed(() => {
    const options = [{
      label: '全部主題',
      value: 0
    }]
    themes.value.forEach(theme => (
      options.push({
        label: theme.name,
        value: theme.id
      })
    ))

    return options
  })


  const saveForm = async (formStates: ThemeFormState[]) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      await Promise.all(formStates.map(async (formState) => {
        if (formState.tempImage) {
          const url = await uploadImage(formState.tempImage)
          formState.imageUrl = url
        }
      }))
      const payload: BatchThemePayload[] = formStates.map(item => {
        return {
          id: item.id,
          data: {
            name: item.name,
            slug: item.slug,
            sortOrder: item.sortOrder,
            description: item.description,
            imageUrl: item.imageUrl
          }
        }
    })
      const res = await updateAllThemes(payload, lan.value)
      toast.show(res[0]!.message, 'success')
    } catch (err: any) {
      handleValidationError(err)
      return false
    } finally {
      load.endLoad()
    }
  }

  const removeImage = (id: number) => {
    formStates.value.find(item => item.id === id)!.imageUrl = ''
    formStates.value.find(item => item.id === id)!.tempImage = null
  }
  
  const toast = useToastStore()
  const load = useLoadingStore()

  // 取得列表
  const getThemes = async () => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const res = await fetchThemes(lan.value)
      themes.value = res.data
      formStates.value = res.data.map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        sortOrder: t.sortOrder,
        description: t.description,
        imageUrl: t.imageUrl,
        tempImage: null
      }))
    } catch (err: any) {
      toast.show(err?.data?.message || '取得主題失敗', 'error')
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
    themeOptions,
    formStates,
    removeImage,
    reload: getThemes,
    saveForm
  }
}