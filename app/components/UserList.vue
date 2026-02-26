<script setup lang="ts">
  const { roleOption } = useRoles();
  const { users, reload } = useUsers();

  const tempPassword = ref('')
</script>

<template>
  <div class="flex flex-col gap-4">
    <UForm v-for="user in users">
      <div class="flex flex-row gap-4">
        <UFormField>
            <UInput v-model="user.account" class="w-60" size="xl" placeholder="請輸入帳號" disabled></UInput>
        </UFormField>
        <UFormField class="flex-1">
            <UInput v-model="tempPassword" type="password" class="w-60" size="xl" placeholder="請輸入密碼"></UInput>
        </UFormField>
        <UFormField class="flex-1">
            <USelect v-model="user.roleCode" class="w-60" size="xl" :items="roleOption" placeholder="請選擇角色"></USelect>
        </UFormField>
        <UButton variant="outline" class="w-20 justify-center">紀錄</UButton>
        <UButton class="w-20 justify-center">刪除</UButton>
        <UButton class="w-20 justify-center">存檔</UButton>
      </div>
    </UForm>
  </div>
</template>