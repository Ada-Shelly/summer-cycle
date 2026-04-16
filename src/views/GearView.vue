<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import type { GearOwner, GearCategory, GearItem } from '@/types'
import { gearCategoryNames } from '@/types'

const store = useAppStore()
const activeTab = ref<GearOwner>('shared')

const filteredItems = computed(() => store.gearItems.filter(g => g.owner === activeTab.value))

const groupedItems = computed<Record<GearCategory, GearItem[]>>(() => {
  const map: Record<GearCategory, GearItem[]> = { wear: [], care: [], daily: [] }
  filteredItems.value.forEach(item => {
    map[item.category].push(item)
  })
  return map
})

const categories = computed(() =>
  (Object.keys(groupedItems.value) as GearCategory[]).filter(cat => groupedItems.value[cat].length > 0)
)

const categoryProgress = computed(() => {
  const result: Record<GearCategory, number> = { wear: 0, care: 0, daily: 0 }
  for (const cat in groupedItems.value) {
    const list = groupedItems.value[cat as GearCategory]
    result[cat as GearCategory] = list.length
      ? Math.round((list.filter(i => i.checked).length / list.length) * 100)
      : 0
  }
  return result
})

const totalProgress = computed(() => {
  const all = store.gearItems
  return all.length ? Math.round((all.filter(i => i.checked).length / all.length) * 100) : 0
})

function toggle(id: string) {
  const item = store.gearItems.find(g => g.id === id)
  if (item) store.updateGearChecked(id, !item.checked)
}
</script>

<template>
  <div class="px-4 py-6 space-y-6 max-w-3xl mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-ink">装备清单</h1>
      <span class="text-sm font-bold text-brand-green">{{ totalProgress }}% 完成</span>
    </div>

    <!-- 人员切换 -->
    <div class="flex items-center gap-2">
      <button
        v-for="tab in [{k:'shared',l:'公共'},{k:'keith',l:'Keith'},{k:'ada',l:'Ada'}]"
        :key="tab.k"
        @click="activeTab = tab.k as GearOwner"
        :class="[
          'px-4 py-2 rounded-xl text-sm font-medium border transition',
          activeTab === tab.k
            ? 'bg-brand-green text-white border-brand-green'
            : 'bg-card text-ink-secondary border-border-soft'
        ]"
      >
        {{ tab.l }}
      </button>
    </div>

    <!-- 分类卡片 -->
    <div
      v-for="cat in categories"
      :key="cat"
      class="bg-card rounded-2xl border border-border-soft p-5"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-bold text-ink">{{ gearCategoryNames[cat] }}</h2>
        <span class="text-xs font-medium text-ink-secondary">{{ categoryProgress[cat] ?? 0 }}%</span>
      </div>

      <div class="h-1.5 bg-brand-green-light rounded-full overflow-hidden mb-4">
        <div
          class="h-full bg-brand-green rounded-full transition-all"
          :style="{ width: `${categoryProgress[cat] ?? 0}%` }"
        />
      </div>

      <div class="space-y-3">
        <label
          v-for="item in groupedItems[cat]"
          :key="item.id"
          class="flex items-start gap-3 cursor-pointer"
        >
          <div
            class="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition"
            :class="item.checked ? 'border-brand-green bg-brand-green' : 'border-border-soft bg-card'"
            @click.prevent="toggle(item.id)"
          >
            <svg
              v-if="item.checked"
              class="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex-1" @click.prevent="toggle(item.id)">
            <p :class="[
              'text-sm font-medium transition',
              item.checked ? 'text-ink-secondary line-through' : 'text-ink'
            ]">
              {{ item.name }}
            </p>
            <p v-if="item.note" class="text-xs text-ink-secondary mt-0.5">{{ item.note }}</p>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
