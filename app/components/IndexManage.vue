<script setup lang="ts">
  const value = ref()
</script>

<template>
  <UForm>
    <div class="flex flex-col gap-12">
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">首頁圖片</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UFileUpload v-model="value" class="w-full min-h-48" />
            <UFileUpload v-model="value" class="w-full min-h-48" />
            <UFileUpload v-model="value" class="w-full min-h-48" />
            <UButton :ui="{ base: 'justify-center' }">新增圖片</UButton>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">首頁文字</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UTextarea :rows="8"></UTextarea>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">電話</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">地址</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">Email</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">facebook</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"></UInput>
          </div>
        </div>
      </UFormField>
      <UFormField orientation="horizontal">
        <div class="flex flex-row gap-4">
          <div class="w-40 text-md pt-2">instagram</div>
          <div class="flex flex-col gap-4 w-3xl">
            <UInput size="xl"></UInput>
          </div>
        </div>
      </UFormField>
      <div class="flex flex-row justify-end">
        <UButton>儲存</UButton>
      </div>
    </div>
  </UForm>
</template>