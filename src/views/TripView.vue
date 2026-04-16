<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<template>
  <div class="px-4 py-6 space-y-6 max-w-3xl mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-ink">行程路书</h1>
      <span class="text-sm text-ink-secondary">{{ store.totalDistance }} km / 5 天</span>
    </div>

    <div class="space-y-4">
      <div v-for="day in store.tripDays" :key="day.id"
        class="bg-card rounded-2xl border border-border-soft p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-ink">{{ day.title }}</h2>
            <p class="text-sm text-ink-secondary mt-1">{{ day.description }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-2xl font-bold text-brand-green">{{ day.distance }}<span class="text-sm font-normal text-ink-secondary"> km</span></p>
          </div>
        </div>

        <!-- Nodes -->
        <div v-if="day.nodes.length" class="mt-5">
          <div class="flex flex-wrap gap-3">
            <div v-for="(node) in day.nodes" :key="node.id"
              class="relative bg-brand-purple-light/60 rounded-xl px-4 py-3 min-w-[8rem]">
              <p class="text-xs text-brand-purple font-semibold">K{{ node.km }}</p>
              <p class="text-sm font-medium text-ink mt-0.5">{{ node.name }}</p>
              <p v-if="node.note" class="text-xs text-ink-secondary mt-1">{{ node.note }}</p>
            </div>
          </div>
        </div>

        <!-- Cultures -->
        <div v-if="day.cultures.length" class="mt-5 space-y-3">
          <div v-for="c in day.cultures" :key="c.title" class="border-l-4 border-brand-green pl-4">
            <h3 class="text-base font-bold text-ink">{{ c.title }}</h3>
            <p class="text-sm text-ink-secondary mt-1 leading-relaxed">{{ c.content }}</p>
          </div>
        </div>

        <!-- Tips -->
        <div v-if="day.tips.length" class="mt-5 flex flex-wrap gap-2">
          <span v-for="t in day.tips" :key="t" class="text-xs bg-brand-orange-light text-brand-orange px-2.5 py-1 rounded-full">{{ t }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
