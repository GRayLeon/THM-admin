import type { Role, RoleUI, RolePayload } from '@/models/role.model'
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

export function useRoles() {

  const roles = ref<Role[]>([])

  const toast = useToastStore()
  const load = useLoadingStore()

  const roleOption = computed(() => roles.value.map(r => ({ label: r.name, value: r.code })))

  const functionOption = ref<CheckboxGroupItem[]>([
    { id: 'HOME_MGMT', label: '首頁管理' },
    { id: 'SPOT_MGMT', label: '地點管理' },
    { id: 'THEME_MGMT', label: '分類管理' }
  ])

  const roleUIList = ref<RoleUI[]>([])

  const toRoleUI = (role: Role): RoleUI => ({
    ...role,
    functions: role.functions.map(f => f.code)
  })

  const toRolePayload = (role: RoleUI): RolePayload => ({
    name: role.name,
    description: role.description,
    functionCodes: role.functions
  })

  // 取得列表
  const getRoles = async () => {
    load.startLoad()
    try {
      const res = await fetchRoles()
      roles.value = res.data
      roleUIList.value = res.data.map(toRoleUI) // 👈 在這裡轉
      toast.show(res.message, 'success')
    } catch (err: any) {
      toast.show(err?.data?.message || '取得角色失敗', 'error')
    } finally {
      load.endLoad()
    }
  }

  // 新增
  const addRole = async (payload: RolePayload) => {
    load.startLoad()
    try {
      const res = await createRole(payload)
      roles.value.push(res.data)
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
  const editRole = async (role: RoleUI) => {
    load.startLoad()
    try {
      const payload = toRolePayload(role)
      const res = await updateRole(role.code, payload)

      // 更新 API model
      const index = roles.value.findIndex(r => r.code === role.code)
      if (index !== -1) {
        roles.value[index] = res.data
      }

      // 同步更新 UI model
      const uiIndex = roleUIList.value.findIndex(r => r.code === role.code)
      if (uiIndex !== -1) {
        roleUIList.value[uiIndex] = toRoleUI(res.data)
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
    roleUIList,
    roleOption,
    functionOption,
    reload: getRoles,
    addRole,
    editRole,
    removeRole
  }
}