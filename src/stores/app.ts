import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { TripDay, GearItem, Stay, AppSettings } from '@/types'
import { initialTripDays, initialGearItems, departDate } from '@/utils/seedData'
import { supabase } from '@/utils/supabase'

const LS_KEY = 'qinghai-cycle-data-v3'

function loadFromLocal(): {
  tripDays: TripDay[]
  gearItems: GearItem[]
  stays: Stay[]
  settings: AppSettings
} | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveToLocal(state: {
  tripDays: TripDay[]
  gearItems: GearItem[]
  stays: Stay[]
  settings: AppSettings
}) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  } catch {}
}

function sanitizeGearItems(items: any[]): GearItem[] {
  return items.map(item => {
    const owner = item.owner === 'male' ? 'keith' : item.owner === 'female' ? 'ada' : item.owner
    const category = item.category === 'electronics' ? 'daily' : item.category
    return { ...item, owner, category } as GearItem
  })
}

export const useAppStore = defineStore('app', () => {
  const isLoggedIn = ref(false)

  const saved = loadFromLocal()
  const tripDays = ref<TripDay[]>(saved?.tripDays ?? structuredClone(initialTripDays))
  const gearItems = ref<GearItem[]>(sanitizeGearItems(saved?.gearItems ?? structuredClone(initialGearItems)))
  const stays = ref<Stay[]>(saved?.stays ?? [])
  const settings = ref<AppSettings>(saved?.settings ?? { mockDate: '' })

  watch(
    [tripDays, gearItems, stays, settings],
    () => {
      saveToLocal({
        tripDays: tripDays.value,
        gearItems: gearItems.value,
        stays: stays.value,
        settings: settings.value
      })
    },
    { deep: true }
  )

  const totalDistance = computed(() => tripDays.value.reduce((sum, d) => sum + d.distance, 0))

  const nowDate = computed(() => {
    if (settings.value.mockDate) {
      return new Date(settings.value.mockDate + 'T00:00:00+08:00')
    }
    return new Date()
  })

  const daysToDepart = computed(() => {
    const diff = Math.ceil((departDate.getTime() - nowDate.value.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  })

  const todayDayId = computed(() => {
    const start = new Date(departDate)
    start.setHours(0, 0, 0, 0)
    const diff = Math.floor((nowDate.value.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return null
    const day = tripDays.value.find((d) => d.dayIndex === diff)
    return day?.id ?? null
  })

  async function login(username: string, password: string) {
    if (username === 'cycle' && password === '123456') {
      isLoggedIn.value = true
      await loadFromSupabase()
      return true
    }
    return false
  }

  function logout() {
    isLoggedIn.value = false
  }

  async function updateGearChecked(id: string, checked: boolean) {
    const item = gearItems.value.find((g) => g.id === id)
    if (item) item.checked = checked
    await syncToSupabase()
  }

  async function saveStay(stay: Stay) {
    const idx = stays.value.findIndex((s) => s.dayId === stay.dayId)
    if (idx >= 0) {
      stays.value[idx] = stay
    } else {
      stays.value.push(stay)
    }
    await syncToSupabase()
  }

  async function syncToSupabase() {
    if (!supabase) return
    const payload = {
      id: 'cycle',
      trip_days: tripDays.value,
      gear_items: gearItems.value,
      stays: stays.value,
      settings: settings.value,
      updated_at: new Date().toISOString()
    }
    await supabase.from('cycle_data').upsert(payload)
  }

  async function loadFromSupabase() {
    if (!supabase) return
    const { data } = await supabase.from('cycle_data').select('*').eq('id', 'cycle').single()
    if (data) {
      tripDays.value = data.trip_days ?? tripDays.value
      gearItems.value = sanitizeGearItems(data.gear_items ?? gearItems.value)
      stays.value = data.stays ?? stays.value
      settings.value = data.settings ?? settings.value
    }
  }

  return {
    isLoggedIn,
    tripDays,
    gearItems,
    stays,
    settings,
    totalDistance,
    daysToDepart,
    todayDayId,
    nowDate,
    login,
    logout,
    updateGearChecked,
    saveStay,
    syncToSupabase,
    loadFromSupabase
  }
})
