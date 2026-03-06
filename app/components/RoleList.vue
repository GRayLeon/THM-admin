<script setup lang="ts">
  import { createRoleSchema, updateRoleSchema } from '~/schemas/role.schema';

  const { formStates, removeItem, addForm, saveForm, functionOption, reload } = useRoles();

  const onSubmit = async (formState: RoleFormState) => {
    await saveForm(formState)
    reload()
  }

  const tempPassword = ref('')
</script>

<template>
  <div class="flex flex-col gap-4">
    <UForm
      v-for="(formState, idx) in formStates"
      :key="idx"
      :schema="formState.code
        ? updateRoleSchema
        : createRoleSchema"
      :state="formState"
      @submit="() => onSubmit(formState)"
    >
      <div class="flex flex-row gap-4 items-center">
        <UFormField class="flex-1">
          <UInput v-if="formState.isNew" v-model="formState.name" type="text" class="w-60" size="xl" placeholder="請輸入帳號"></UInput>
          <div v-else class="flex-1 flex flex-row items-center">
            <div class="w-60">{{ formState.name }}</div>
          </div>
        </UFormField>
        <UFormField>
            <UInput v-model="formState.code" class="w-60" size="xl" placeholder="請輸入角色代號"></UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UCheckboxGroup class="w-80" value-key="id" v-model="formState.functions" orientation="horizontal" :items="functionOption"></UCheckboxGroup>
        </UFormField>
        <UButton class="w-20 justify-center" @click="removeItem(formState.code, idx)">刪除</UButton>
        <UButton class="w-20 justify-center" type="submit">存檔</UButton>
      </div>
    </UForm>
    <UButton class="w-full justify-center cursor-pointer" @click="addForm">新增角色</UButton>
  </div>
</template>