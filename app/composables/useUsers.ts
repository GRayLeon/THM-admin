import type { User, CreateUserPayload } from '@/models/user.model'
import { 
  useUserService
} from '@/services/user.service'

const {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} = useUserService()

export type UserFormState = {
  id?: number
  account: string
  password?: string
  roleCode: string
  status: 'ACTIVE' | 'INACTIVE'
  isNew: boolean
}

export function useUsers() {

  const formStates = ref<UserFormState[]>([])

  const createEmptyForm = (): UserFormState => ({
    id: undefined,
    account: '',
    password: '',
    roleCode: '',
    status: 'ACTIVE',
    isNew: true
  })

  const users = ref<User[]>([])

  const addForm = () => {
    formStates.value.push(createEmptyForm())
  }

  const saveForm = async (form: UserFormState) => {
    load.startLoad()

    try {
      if (form.isNew) {
        const payload: CreateUserPayload = {
          account: form.account,
          password: form.password ?? '',
          roleCode: form.roleCode
        }

        const res = await createUser(payload)
        form.id = res.data.id
        form.isNew = false
        toast.show(res.message, 'success')
      } else {
        if (!form.id) return

        const res = await updateUser(form.id, form)
        toast.show(res.message, 'success')
      }

      return true
    } catch (err: any) {
      handleValidationError(err)
      return false
    } finally {
      load.endLoad()
    }
  }

  const removeItem = async (id: number, index: number = -1) => {
    load.startLoad()
    try {
      if (id !== 0) {
        await removeUser(id)
        toast.show('刪除成功', 'success')
      } else {
        formStates.value.splice(index, 1)
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
  const getUsers = async () => {
    load.startLoad()
    try {
      const res = await fetchUsers()
      users.value = res.data
      const activeUsers = res.data.filter(u => u.status === 'ACTIVE')
      formStates.value = activeUsers.map(u => ({
        id: u.id,
        account: u.account,
        roleCode: u.roleCode,
        status: u.status,
        password: '',
        isNew: false
      }))
    } catch (err: any) {
      toast.show(err?.data?.message || '取得使用者失敗', 'error')
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
    } catch (err: any) {
      toast.show(err?.data?.message || '刪除失敗', 'error')
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
    formStates,
    addForm,
    saveForm,
    removeItem
  }
}