export function useUpload() {
  const uploading = ref(false)
  const error = ref<string | null>(null)

  const uploadImage = async (file: File, folder = 'common'): Promise<string> => {
    if (file.size > 10 * 1024 * 1024) throw new Error('圖片大小不能超過 10MB')

    const token = useCookie<string>('access_token').value

    uploading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('imageFile', file)

      const uploadFolderName = folder
      formData.append('uploadFolderName', uploadFolderName)

      const apiUrl = 'https://api.thm720.com/cms-service'
      const BASE = `${apiUrl}/api/v1/common/upload-image`

      const res = await fetch(BASE, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {
        if (res.status === 401) throw new Error('請先登入')
        if (res.status === 400) throw new Error('圖片格式不正確')
        throw new Error('圖片上傳失敗')
      }


      const result = await res.json()
      if (!result.success || !result.data?.imageUrl) throw new Error(result.message || '上傳失敗')

      return result.data.imageUrl
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      uploading.value = false
    }
  }

  return { uploadImage, uploading, error }
}