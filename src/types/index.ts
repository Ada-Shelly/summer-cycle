// ============================================
// 青海湖骑行助手 - 类型定义
// ============================================

/** 行程节点（如 K28 甘子河乡） */
export interface TripNode {
  id: string
  km: number
  name: string
  note?: string
}

/** 文化/地理知识点 */
export interface CulturePoint {
  title: string
  content: string
}

/** 每日行程 */
export interface TripDay {
  id: string
  dayIndex: number
  title: string
  from: string
  to: string
  distance: number
  startTime?: string
  description: string
  nodes: TripNode[]
  cultures: CulturePoint[]
  tips: string[]
}

// ============================================
// 装备清单
// ============================================

export type GearOwner = 'shared' | 'keith' | 'ada'
export type GearCategory = 'wear' | 'care' | 'daily'

export interface GearItem {
  id: string
  name: string
  category: GearCategory
  owner: GearOwner
  checked: boolean
  note?: string
}

export const gearCategoryNames: Record<GearCategory, string> = {
  wear: '穿戴类',
  care: '护理包',
  daily: '电子与日用'
}

// ============================================
// 天气穿衣建议
// ============================================

export type WeatherScenario =
  | 'sunny'
  | 'cloudy-windy'
  | 'rain-sand'
  | 'cold-pass'
  | 'night-hotel'

export interface WeatherAdvice {
  scenario: WeatherScenario
  label: string
  temp: string
  outfit: string
  actions: string[]
}

// ============================================
// 住宿信息
// ============================================

export interface Stay {
  id: string
  dayId: string
  name: string
  phone: string
  location: string
  checkInDate: string
}

// ============================================
// 应用设置
// ============================================

export interface AppSettings {
  /** 模拟日期（YYYY-MM-DD），留空则使用系统日期 */
  mockDate: string
}
