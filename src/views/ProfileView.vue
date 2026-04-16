<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'

const store = useAppStore()
const router = useRouter()
const certRef = ref<HTMLElement | null>(null)
const generating = ref(false)

function logout() {
  store.logout()
  router.replace('/login')
}

async function generateCertificate() {
  if (!certRef.value) return
  generating.value = true
  const canvas = await html2canvas(certRef.value, { scale: 2, backgroundColor: null })
  const link = document.createElement('a')
  link.download = '青海湖骑行证书.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
  generating.value = false
}
</script>

<template>
  <div class="px-4 py-6 space-y-6 max-w-3xl mx-auto">
    <h1 class="text-xl font-bold text-ink">我的</h1>

    <!-- Certificate preview -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-base font-bold text-ink">骑行证书</h2>
        <button @click="generateCertificate" :disabled="generating"
          class="px-3 py-1.5 rounded-lg bg-brand-purple text-white text-sm font-medium disabled:opacity-50">{{ generating ? '生成中' : '保存图片' }}</button>
      </div>
      <div ref="certRef" class="relative w-full max-w-md mx-auto aspect-[1200/630] rounded-2xl overflow-hidden shadow-sm"
        style="background: linear-gradient(135deg, #10B981 0%, #059669 100%);">
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
          <p class="text-lg opacity-90 tracking-widest">青海湖骑行</p>
          <h3 class="text-3xl font-bold mt-2">360 km 完赛纪念</h3>
          <p class="text-base mt-4 opacity-90">2026.05.01 — 2026.05.04</p>
          <p class="text-sm mt-6 opacity-80">西海镇 · 刚察 · 石乃亥 · 江西沟 · 西海镇</p>
        </div>
      </div>
    </div>

    <!-- Safety info -->
    <div class="bg-card rounded-2xl border border-border-soft p-5">
      <h2 class="text-base font-bold text-ink mb-3">安全与环保</h2>
      <ul class="space-y-2 text-sm text-ink-secondary">
        <li>全程严禁乱扔垃圾，须将垃圾带至西海镇处理。</li>
        <li>遇经幡严禁跨越。</li>
        <li>拍摄藏族人物前须微笑示意并征得同意。</li>
        <li>购买牧民酸奶或糌粑时勿过度讲价。</li>
        <li>遇转湖藏民须主动礼让。</li>
        <li>严禁惊扰野生动物，遇藏羚羊、普氏原羚须保持距离。</li>
      </ul>
    </div>

    <button @click="logout" class="w-full rounded-xl border border-red-200 text-red-600 py-3 text-sm font-medium">退出登录</button>
  </div>
</template>
