<script setup lang="ts">
  const { roleUIList, functionOption, reload } = useRoles();

  const tempPassword = ref('')
</script>

<template>
  <div class="flex flex-col gap-4">
    <UForm v-for="role in roleUIList" :key="role.code">
      <div class="flex flex-row gap-4 items-center">
        <UFormField>
            <UInput v-model="role.name" class="w-60" size="xl" placeholder="請輸入角色"></UInput>
        </UFormField>
        <UFormField>
            <UInput v-model="role.code" class="w-60" size="xl" placeholder="請輸入角色代號"></UInput>
        </UFormField>
        <UFormField class="flex-1">
          <UCheckboxGroup value-key="id" v-model="role.functions" orientation="horizontal" :items="functionOption"></UCheckboxGroup>
        </UFormField>
        <UButton class="w-20 justify-center">刪除</UButton>
        <UButton class="w-20 justify-center">存檔</UButton>
      </div>
    </UForm>
  </div>
</template>