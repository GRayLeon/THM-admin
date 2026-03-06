import type { ActivityLogPageDto } from '@/models/activity-log.model'
import { 
  useActivityLogService
} from '@/services/activity-log.service'

const {
  fetchActivityLogs
} = useActivityLogService()

export const useActivityLogs = () => {
  const activityLogs = ref<ActivityLogPageDto>({
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  })

  const toast = useToastStore()
  const load = useLoadingStore()

  const getActivityLogs = async (userId: number, page = 0, size = 20) => {
    load.startLoad()
    try {
      const res = await fetchActivityLogs(userId, page, size)
      activityLogs.value = res.data
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得日誌失敗', 'error')
    } finally {
      load.endLoad()
    }
  }
  return {
    getActivityLogs,
    activityLogs
  }
}