<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const store = useAppStore()
const username = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  error.value = ''
  const ok = store.login(username.value.trim(), password.value.trim())
  if (ok) {
    router.replace('/')
  } else {
    error.value = '账号或密码错误'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-paper px-4">
    <div class="w-full max-w-sm bg-card rounded-2xl shadow-sm border border-border-soft p-8">
      <h1 class="text-2xl font-bold text-center text-ink mb-2">环湖骑行助手</h1>
      <p class="text-center text-ink-secondary mb-8">Cycle around Qinghai Lake</p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-ink-secondary mb-1">账号</label>
          <input
            v-model="username"
            type="text"
            class="w-full rounded-xl border border-border-soft bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-ink-secondary mb-1">密码</label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-xl border border-border-soft bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
        <button
          type="submit"
          class="w-full rounded-xl bg-brand-green text-white font-semibold py-3 shadow-sm hover:opacity-95 transition"
        >
          进入
        </button>
      </form>
    </div>
  </div>
</template>
