<script setup lang="ts">
import { ref, computed } from 'vue'
import { weatherAdvices } from '@/utils/seedData'
import type { WeatherScenario } from '@/types'

const selected = ref<WeatherScenario>('sunny')

const advice = computed(() => weatherAdvices.find(a => a.scenario === selected.value)!)

function select(s: WeatherScenario) {
  selected.value = s
}
</script>

<template>
  <div class="px-4 py-6 space-y-5 max-w-3xl mx-auto">
    <h1 class="text-xl font-bold text-ink">天气穿衣助手</h1>

    <!-- Scenario selector -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button v-for="w in weatherAdvices" :key="w.scenario" @click="select(w.scenario)"
        :class="['text-left rounded-xl border px-4 py-3 transition', selected === w.scenario ? 'bg-brand-green text-white border-brand-green' : 'bg-card text-ink border-border-soft']">
        <p class="font-semibold">{{ w.label }}</p>
        <p class="text-sm opacity-90 mt-0.5">{{ w.temp }}</p>
      </button>
    </div>

    <!-- Advice card -->
    <div class="bg-card rounded-2xl border border-border-soft p-5">
      <h2 class="text-lg font-bold text-ink">{{ advice.label }}</h2>
      <p class="text-sm text-ink-secondary mt-1">温度：{{ advice.temp }}</p>
      <div class="mt-4">
        <p class="text-sm font-semibold text-ink">穿戴组合</p>
        <p class="text-base text-ink mt-1 leading-relaxed">{{ advice.outfit }}</p>
      </div>
      <div class="mt-4">
        <p class="text-sm font-semibold text-ink">关键动作</p>
        <ul class="mt-2 space-y-2">
          <li v-for="(a, idx) in advice.actions" :key="idx" class="flex items-start gap-2 text-sm text-ink-secondary">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-brand-green mt-2"></span>
            <span>{{ a }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Static tips -->
    <div class="bg-brand-orange-light/60 rounded-2xl border border-brand-orange/20 p-5">
      <h3 class="text-sm font-bold text-brand-orange mb-2">5月特殊风险提示</h3>
      <ul class="space-y-2 text-sm text-ink-secondary">
        <li>降雪可能：5月初高海拔区域（如315国道垭口）仍可能降雪，分体雨衣在此时充当防风保暖层，比冲锋衣更可靠。</li>
        <li>紫外线：5月云层薄，辐射为平原3倍，面罩+冰袖+墨镜的物理防晒优于防晒霜，但暴露处（后颈、手背）仍需补涂。</li>
        <li>失温防线：昼夜温差8-15°C，如遇冰雹气温骤降至0°C以下，停下立即加衣，宁可热脱不要冷挨。</li>
        <li>Action4固定：5月风大，胸前带务必系紧，曾有设备吹落湖中。</li>
      </ul>
    </div>
  </div>
</template>
