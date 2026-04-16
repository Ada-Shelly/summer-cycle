<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { departDate } from '@/utils/seedData'
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()

const today = computed(() => {
  const dayId = store.todayDayId
  return dayId ? store.tripDays.find(d => d.id === dayId) : null
})

const mockDateStr = computed({
  get: () => store.settings.mockDate,
  set: (val: string) => {
    store.settings.mockDate = val
  }
})
</script>

<template>
  <div class="px-4 py-6 space-y-6 max-w-3xl mx-auto">
    <!-- 出发倒计时 -->
    <div class="bg-card rounded-2xl border border-border-soft p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-ink-secondary">距离出发</p>
          <p class="text-3xl font-bold text-ink mt-1">
            {{ store.daysToDepart > 0
              ? `还有 ${store.daysToDepart} 天`
              : store.daysToDepart === 0
                ? '今天出发'
                : `已出发 ${Math.abs(store.daysToDepart)} 天` }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-ink-secondary">出发日期</p>
          <p class="text-lg font-semibold text-ink mt-1">
            {{ departDate.toLocaleDateString('zh-CN') }}
          </p>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-border-soft">
        <label class="block text-xs font-medium text-ink-secondary mb-1">
          模拟日期（留空则使用系统日期）
        </label>
        <input
          type="date"
          v-model="mockDateStr"
          class="w-full sm:w-auto rounded-xl border border-border-soft bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
      </div>
    </div>

    <!-- 今日行程 -->
    <div v-if="today" class="bg-brand-green-light/70 rounded-2xl border border-brand-green/20 p-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-ink">今日行程</h2>
        <span class="text-sm text-ink-secondary">{{ today.from }} → {{ today.to }}</span>
      </div>
      <p class="text-2xl font-bold text-brand-green mb-2">{{ today.distance }} km</p>
      <p class="text-sm text-ink-secondary line-clamp-2">{{ today.description }}</p>
      <button
        @click="router.push('/trip')"
        class="mt-4 text-sm font-medium text-brand-green hover:underline"
      >
        查看详情
      </button>
    </div>

    <div v-else class="bg-card rounded-2xl border border-border-soft p-6 text-center">
      <p class="text-ink-secondary">尚未到出发日，可以先检查装备和天气。</p>
      <div class="mt-4 flex items-center justify-center gap-3">
        <button
          @click="router.push('/gear')"
          class="px-4 py-2 rounded-xl bg-brand-green text-white text-sm font-medium"
        >
          装备清单
        </button>
        <button
          @click="router.push('/weather')"
          class="px-4 py-2 rounded-xl bg-brand-purple text-white text-sm font-medium"
        >
          天气穿衣
        </button>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        v-for="item in [
          { path: '/trip', label: '行程', desc: '5 天路书' },
          { path: '/gear', label: '装备', desc: '实时统计' },
          { path: '/stay', label: '住宿', desc: '编辑信息' },
          { path: '/weather', label: '天气', desc: '穿衣指南' }
        ]"
        :key="item.path"
        @click="router.push(item.path)"
        class="bg-card rounded-2xl border border-border-soft p-4 text-left hover:shadow-sm transition"
      >
        <p class="text-sm text-ink-secondary">{{ item.label }}</p>
        <p class="text-base font-semibold text-ink mt-1">{{ item.desc }}</p>
      </button>
    </div>
  </div>
</template>
