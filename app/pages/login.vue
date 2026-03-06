<script setup lang="ts">
import { z } from 'zod'
import { useAuthStore } from '@/stores/auth.store'

definePageMeta({
  layout: 'auth'
})

const auth = useAuthStore()

// schema

const schema = z.object({
  account: z.string().min(1, '請輸入帳號'),
  password: z.string().min(6, '密碼至少 6 碼')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  account: '',
  password: ''
})

const errorMessage = ref<string | null>(null)

// Submit

const onSubmit = async () => {
  errorMessage.value = null

  try {
    await auth.login(state.account, state.password)
    await navigateTo('/')
  } catch (err: any) {
    errorMessage.value = err?.data?.message || '登入失敗'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <UCard class="w-full max-w-md shadow-xl">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold">後台登入</h1>
        </div>
      </template>
      
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 flex flex-col gap-1"
        @submit="onSubmit"
      >
        <UFormGroup label="帳號" name="account">
          <UInput
            class="w-full"
            size="xl"
            v-model="state.account"
            placeholder="請輸入帳號"
            icon="i-heroicons-user"
          />
        </UFormGroup>

        <UFormGroup label="密碼" name="password">
          <UInput
            class="w-full"
            size="xl"
            v-model="state.password"
            type="password"
            placeholder="請輸入密碼"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>

        <div v-if="errorMessage" class="text-sm text-red-500">
          {{ errorMessage }}
        </div>

        <UButton
          type="submit"
          block
          :loading="auth.loading"
        >
          登入
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>