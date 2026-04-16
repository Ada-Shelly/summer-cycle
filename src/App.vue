<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const route = useRoute()
const router = useRouter()
const drawerOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/trip', label: '行程' },
  { path: '/gear', label: '装备' },
  { path: '/weather', label: '天气' },
  { path: '/stay', label: '住宿' },
  { path: '/profile', label: '我的' }
]

function goTo(path: string) {
  router.push(path)
  drawerOpen.value = false
}
</script>

<template>
  <div class="flex h-screen bg-paper transition-colors-slow">
    <!-- Sidebar for desktop -->
    <aside class="hidden md:flex flex-col w-56 bg-card border-r border-border-soft">
      <div class="px-6 py-6">
        <h1 class="text-lg font-bold text-ink">环湖骑行</h1>
        <p class="text-xs text-ink-secondary mt-1">360km 路书助手</p>
      </div>
      <nav class="flex-1 px-3 space-y-1">
        <button v-for="item in navItems" :key="item.path" @click="goTo(item.path)"
          :class="['w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition', route.path === item.path ? 'bg-brand-green text-white' : 'text-ink-secondary hover:bg-paper-warm']">
          {{ item.label }}
        </button>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile header -->
      <header class="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border-soft">
        <h1 class="text-base font-bold text-ink">环湖骑行</h1>
        <button @click="drawerOpen = true" class="p-2 rounded-lg hover:bg-paper-warm">
          <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </header>

      <main class="flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <!-- Mobile drawer -->
    <div v-if="drawerOpen" class="md:hidden fixed inset-0 z-50" @click.self="drawerOpen = false">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute right-0 top-0 bottom-0 w-64 bg-card shadow-xl p-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-base font-bold text-ink">菜单</h2>
          <button @click="drawerOpen = false" class="p-2 rounded-lg hover:bg-paper-warm">
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <nav class="space-y-1">
          <button v-for="item in navItems" :key="item.path" @click="goTo(item.path)"
            :class="['w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition', route.path === item.path ? 'bg-brand-green text-white' : 'text-ink-secondary hover:bg-paper-warm']">
            {{ item.label }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
