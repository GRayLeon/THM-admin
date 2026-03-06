import type { Role, RoleUI, CreateRolePayload, UpdateRolePayload } from '@/models/role.model'
import { 
  useRoleService
} from '@/services/role.service'

import type { CheckboxGroupItem } from '@nuxt/ui'

const {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole
} = useRoleService()

export type RoleFormState = {
  code: string,
  name: string,
  description?: string,
  functions: string[],
  isNew: boolean
}

export function useRoles() {

  const formStates = ref<RoleFormState[]>([])

  const createEmptyForm = (): RoleFormState => ({
    code: '',
    name: '',
    description: '',
    functions: [],
    isNew: true
  })

  const roles = ref<Role[]>([])

  const tempRoles = ref<Role[]>([])

  const addForm = () => {
    formStates.value.push(createEmptyForm())
  }

  const saveForm = async (form: RoleFormState) => {
    load.startLoad()

    try {
      if (form.isNew) {
        const payload: CreateRolePayload = {
          code: form.code,
          name: form.name,
          description: form.description,
          functionCodes: form.functions
        }

        const res = await createRole(payload)
        form.code = res.data.code
        form.isNew = false
        toast.show(res.message, 'success')
      } else {
        if (!form.code) return

        const payload: UpdateRolePayload = {
          name: form.name,
          description: form.description,
          functionCodes: form.functions
        }

        const res = await updateRole(form.code, payload)
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

  const removeItem = async (code: string, index: number = -1) => {
    load.startLoad()
    try {
      if (code) {
        await removeRole(code)
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

  const roleOption = computed(() => roles.value.map(r => ({ label: r.name, value: r.code })))

  const functionOption = ref<CheckboxGroupItem[]>([
    { id: 'HOME_MGMT', label: '首頁管理' },
    { id: 'SPOT_MGMT', label: '地點管理' },
    { id: 'THEME_MGMT', label: '分類管理' }
  ])

  const toRoleUI = (role: Role): RoleUI => ({
    ...role,
    functions: role.functions.map(f => f.code),
    isNew: false
  })

  // 取得列表
  const getRoles = async () => {
    load.startLoad()
    try {
      const res = await fetchRoles()
      roles.value = res.data
      formStates.value = roles.value.map(toRoleUI)
    } catch (err: any) {
      toast.show(err?.data?.message || '取得角色失敗', 'error')
    } finally {
      load.endLoad()
    }
  }

  // 刪除
  const removeRole = async (code: string) => {
    load.startLoad()
    try {
      const res = await deleteRole(code)

      roles.value = roles.value.filter(r => r.code !== code)

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

  onMounted(getRoles)

  return {
    roles,
    roleOption,
    functionOption,
    formStates,
    reload: getRoles,
    addForm,
    saveForm,
    removeItem
  }
}