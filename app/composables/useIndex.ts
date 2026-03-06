import type { IndexData, IndexDataPayload } from '@/models/index.model'
import { 
  useIndexService
} from '@/services/index.service'

const { uploadImage } = useUpload()
const {
  fetchIndexData,
  updateIndexData
} = useIndexService()

export interface HomeCarousel {
  url: string,
  tempImage: File | null
}

export type IndexFormState = {
  homeCarousel: HomeCarousel[]
  homeIntro: string
  phone: string
  address: string
  email: string
  facebookUrl: string
  instagramUrl: string
}

export interface tempImage {
  idx: string
  file?: File | null
}

export function useIndex() {

  const formState = useState<IndexFormState>('indexDataState', () => ({
    homeCarousel: [],
    homeIntro: '',
    phone: '',
    address: '',
    email: '',
    facebookUrl: '',
    instagramUrl: ''
  }))

  const indexData = ref<IndexData>({
    id: 0,
    homeCarousel: [],
    homeIntro: '',
    phone: '',
    address: '',
    email: '',
    facebookUrl: '',
    instagramUrl: ''
  })

  const addImage = () => {
    formState.value.homeCarousel.push({
      url: '',
      tempImage: null
    })
  }

  const removeImage = (idx: number) => {
    formState.value.homeCarousel.splice(idx, 1)
  }

  const saveForm = async (form: IndexFormState) => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const homeCarousel = await Promise.all(form.homeCarousel.map(async (carousel, idx) => {
        if (carousel.tempImage) {
          const url = await uploadImage(carousel.tempImage)
          return url
        }
        return carousel.url
      }))

      const payload: IndexDataPayload = {
        ...form,
        homeCarousel
      }

      const res = await updateIndexData(payload, lan.value)

      toast.show(res.message, 'success')
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
  const getIndexData = async () => {
    load.startLoad()

    const languageStore = useLanguageStore()
    const { lan } = storeToRefs(languageStore)

    try {
      const res = await fetchIndexData(lan.value)
      indexData.value = res.data
      formState.value = {
        homeCarousel: res.data.homeCarousel.map(hc => ({
          url: hc,
          tempImage: null
        })),
        homeIntro: res.data.homeIntro ?? '',
        phone: res.data.phone ?? '',
        address: res.data.address ?? '',
        email: res.data.email ?? '',
        facebookUrl: res.data.facebookUrl ?? '',
        instagramUrl: res.data.instagramUrl ?? ''
      }
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得使用者失敗', 'error')
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
    formState,
    addImage,
    removeImage,
    reload: getIndexData,
    saveForm
  }
}