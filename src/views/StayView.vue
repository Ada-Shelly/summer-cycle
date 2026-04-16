<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { Stay } from '@/types'

const store = useAppStore()

const list = computed(() => {
  return store.tripDays.map(day => {
    const stay = store.stays.find(s => s.dayId === day.id)
    return { day, stay }
  })
})

function update(dayId: string, field: keyof Stay, value: string) {
  const existing = store.stays.find(s => s.dayId === dayId)
  const next: Stay = existing
    ? { ...existing, [field]: value }
    : { id: crypto.randomUUID(), dayId, name: '', phone: '', location: '', checkInDate: '', [field]: value }
  store.saveStay(next)
}
</script>

<template>
  <div class="px-4 py-6 space-y-5 max-w-3xl mx-auto">
    <div>
      <h1 class="text-xl font-bold text-ink">住宿管理</h1>
      <p class="text-sm text-ink-secondary mt-1">填写每晚的酒店信息，点击导航可唤起地图搜索。</p>
    </div>

    <div v-for="{ day, stay } in list" :key="day.id" class="bg-card rounded-2xl border border-border-soft p-5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-bold text-ink">{{ day.title }} 住宿</h2>
        <span class="text-xs text-ink-secondary">{{ day.to }}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-ink-secondary mb-1">酒店</label>
          <input
            :value="stay?.name ?? ''"
            @input="update(day.id, 'name', ($event.target as HTMLInputElement).value)"
            class="w-full rounded-xl border border-border-soft bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-ink-secondary mb-1">电话</label>
          <input
            :value="stay?.phone ?? ''"
            @input="update(day.id, 'phone', ($event.target as HTMLInputElement).value)"
            class="w-full rounded-xl border border-border-soft bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-xs font-medium text-ink-secondary mb-1">位置</label>
          <div class="flex items-center gap-2">
            <input
              :value="stay?.location ?? ''"
              @input="update(day.id, 'location', ($event.target as HTMLInputElement).value)"
              class="flex-1 rounded-xl border border-border-soft bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <a
              v-if="stay?.location"
              :href="`https://uri.amap.com/search?keyword=${encodeURIComponent(stay.location)}`"
              target="_blank"
              class="shrink-0 px-3 py-2 rounded-xl bg-brand-green text-white text-sm font-medium"
            >导航</a>
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-ink-secondary mb-1">入住日</label>
          <input
            type="date"
            :value="stay?.checkInDate ?? ''"
            @input="update(day.id, 'checkInDate', ($event.target as HTMLInputElement).value)"
            class="w-full rounded-xl border border-border-soft bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
      </div>
    </div>
  </div>
</template>
