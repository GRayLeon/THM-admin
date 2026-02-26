import type { User, CreateUserPayload, UpdateUserPayload } from '@/models/user.model'
import { 
  useUserService
} from '@/services/user.service'

const {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} = useUserService()

export function useUsers() {

  const users = ref<User[]>([])

  const toast = useToastStore()
  const load = useLoadingStore()

  // 取得列表
  const getUsers = async () => {
    load.startLoad()
    try {
      const res = await fetchUsers()
      users.value = res.data
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得使用者失敗', 'error')
    } finally {
      load.endLoad()
    }
  }

  // 新增
  const addUser = async (payload: CreateUserPayload) => {
    load.startLoad()
    try {
      const res = await createUser(payload)
      users.value.push(res.data)
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
  const editUser = async (id: number, payload: UpdateUserPayload) => {
    load.startLoad()
    try {
      const res = await updateUser(id, payload)

      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = res.data
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
  const removeUser = async (id: number) => {
    load.startLoad()
    try {
      const res = await deleteUser(id)

      users.value = users.value.filter(u => u.id !== id)

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

  onMounted(getUsers)

  return {
    users,
    reload: getUsers,
    addUser,
    editUser,
    removeUser
  }
}