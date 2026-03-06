<script setup lang="ts">
  import { createUserSchema, updateUserSchema } from '@/schemas/user.schema'

  const { roleOption } = useRoles()
  const { addForm, reload, formStates, saveForm, removeItem } = useUsers()

  const onSubmit = async (formState: UserFormState) => {
    await saveForm(formState)
    reload()
  }
  
  const goUser = (userId: number) => {
    navigateTo(`/users/${userId}`)
  }
</script>

<template>
  <div class="flex flex-col gap-4">
    <UForm
      v-for="(formState, idx) in formStates"
      :key="idx"
      :schema="formState.id && formState.id > 0
        ? updateUserSchema
        : createUserSchema"
      :state="formState"
      @submit="() => onSubmit(formState)"
    >
      <div class="flex flex-row gap-4 items-center">
        <UFormField class="flex-1">
          <UInput v-if="!formState.id" v-model="formState.account" type="text" class="w-60" size="xl" placeholder="請輸入帳號"></UInput>
          <div v-else class="flex-1 flex flex-row items-center">
            <div class="w-60">{{ formState.account }}</div>
          </div>
        </UFormField>
        <UFormField class="flex-1">
            <UInput v-model="formState.password" type="password" class="w-60" size="xl" placeholder="請輸入密碼"></UInput>
        </UFormField>
        <UFormField class="flex-1">
            <USelect disabled class="w-60" size="xl" v-if="formState.roleCode === 'ADMIN'">系統管理員</USelect>
            <USelect v-else v-model="formState.roleCode" class="w-60" size="xl" :items="roleOption" placeholder="請選擇角色"></USelect>
        </UFormField>
        <UButton variant="outline" class="w-20 justify-center cursor-pointer" @click="goUser(formState.id ?? 0)" :disabled="!formState.id">紀錄</UButton>
        <UButton class="w-20 justify-center cursor-pointer" @click="removeItem(formState.id ?? 0, idx)">刪除</UButton>
        <UButton class="w-20 justify-center cursor-pointer" type="submit" loading-auto>存檔</UButton>
      </div>
    </UForm>
    <UButton class="w-full justify-center cursor-pointer" @click="addForm">新增使用者</UButton>
  </div>
</template>