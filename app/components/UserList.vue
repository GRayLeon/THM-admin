<script setup lang="ts">
  import { useLoadingStore } from '@/stores/loading';
  const { users, reload } = useUsers();
  const { isLoading } = useLoadingStore();
</script>

<template>
  <div>
    <ul v-if="!isLoading">
      <li v-for="user in users" :key="user.hashid">
        <strong>{{ user.name }}</strong> — {{ user.email }}
      </li>
    </ul>

    <UButton @click="reload">Reload</UButton>
  </div>
</template>