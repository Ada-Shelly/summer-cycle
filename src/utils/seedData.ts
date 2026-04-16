import type { TripDay, GearItem, WeatherAdvice } from '@/types'

export const initialTripDays: TripDay[] = [
  {
    id: 'day0',
    dayIndex: 0,
    title: 'Day0 西宁至西海镇',
    from: '西宁',
    to: '西海镇',
    distance: 0,
    description: '下午抵达西海镇，租车并调试。参观原子城纪念馆，馆内禁止拍照。晚宿西海镇。',
    nodes: [],
    cultures: [
      { title: '原子城纪念馆', content: '中国第一颗原子弹研制基地旧址，馆内禁止拍照。' }
    ],
    tips: ['馆内禁止拍照', '下午抵达后先租车调试']
  },
  {
    id: 'day1',
    dayIndex: 1,
    title: 'Day1 西海镇→刚察',
    from: '西海镇',
    to: '刚察',
    distance: 87,
    startTime: '09:00',
    description: '09:00出发，沿315国道骑行。此路段大货车密集，须靠右行驶。',
    nodes: [
      { id: 'd1n1', km: 28, name: '甘子河乡' },
      { id: 'd1n2', km: 58, name: '哈尔盖镇' },
      { id: 'd1n3', km: 87, name: '刚察县，海拔3300m', note: '注意高反与休息' }
    ],
    cultures: [
      {
        title: '仓央嘉措文化广场',
        content: '刚察是藏传佛教史上关键地点。1706年，六世达赖喇嘛仓央嘉措押解进京途中于此圆寂。县城仓央嘉措文化广场立有其石刻雕塑，56块诗歌墙以特定长度对应大师生辰：28米两道（1683年2月28日出生）、25米一道（1696年10月25日坐床）、14米一道（坐床时年14岁）、12米一道（1706年11月12日圆寂）。广场东侧33米高的慈悲慧眼感恩塔属藏传佛教建筑，绕行须顺时针。'
      },
      {
        title: '仙女湾湿地',
        content: '国际重要湿地，亦是青海湖裸鲤洄游核心区。5月可见早期洄游鱼群。据传此处为西王母设宴周穆王之地，李商隐《瑶池》诗"八骏日行三万里"即指此。'
      }
    ],
    tips: ['大货车密集，须靠右行驶', '海拔3300m，注意高反']
  },
  {
    id: 'day2',
    dayIndex: 2,
    title: 'Day2 刚察→石乃亥',
    from: '刚察',
    to: '石乃亥',
    distance: 83,
    startTime: '09:00',
    description: '09:00出发，进入环湖西路。此段紧贴青海湖，距湖最近处仅几十米。',
    nodes: [
      { id: 'd2n1', km: 28, name: '泉吉乡' },
      { id: 'd2n2', km: 43, name: '鸟岛镇/布哈河大桥', note: '鸟岛核心区已封闭，但布哈河入湖口外部为候鸟聚集区。5月正值斑头雁、棕头鸥繁殖期。观鸟时保持安静，严禁驱赶投喂，拍照禁用闪光灯。藏族视候鸟为神灵使者，沿湖可见牧民煨桑祭祀。' },
      { id: 'd2n3', km: 68, name: '尕日拉寺路口', note: '由此向北5km可达寺庙。' }
    ],
    cultures: [
      {
        title: '尕日拉寺',
        content: '属宁玛派，建于崖前平地，可俯瞰青海湖全景。寺周经幡藏语称"龙达"，五色分别象征天空、祥云、火焰、大地与水。经幡是连接神与人的纽带，风吹动一次即等于诵经一次。严禁跨越经幡，遇经幡横跨道路须从下方推行或绕行。'
      },
      {
        title: '圣湖与转湖',
        content: '青海湖为藏族圣湖，转湖者沿湖磕头朝拜，方式有跪磕头、磕长头、莲花磕三种，分别需时2月、3月、半年。转湖者行囊简朴，沿途由群众供给食宿，体现社区支持传统。'
      }
    ],
    tips: ['严禁跨越经幡', '观鸟保持安静，禁用闪光灯', '遇转湖藏民须主动礼让']
  },
  {
    id: 'day3',
    dayIndex: 3,
    title: 'Day3 石乃亥→江西沟',
    from: '石乃亥',
    to: '江西沟',
    distance: 88,
    startTime: '09:00',
    description: '09:00出发，继续沿环湖西路骑行，可见青藏铁路列车沿湖而过。',
    nodes: [
      { id: 'd3n1', km: 41, name: '黑马河乡', note: '路过不停留' },
      { id: 'd3n2', km: 88, name: '江西沟' }
    ],
    cultures: [
      {
        title: '东格尔观鸟点',
        content: '位于黑马河附近，可免费近距离观鸟。环湖西路部分路段有牧民自行围起的小区域，收费10-20元，内设有值得拍摄的景致。'
      },
      {
        title: '自然保护区',
        content: '青海湖为国家级自然保护区，严禁进入核心区（海心山、三块石、鸟岛、沙岛），严禁投喂鱼类、捕捞垂钓。船舶须避开水鸟栖息地1000米以上。'
      }
    ],
    tips: ['严禁进入保护区核心区', '严禁投喂鱼类、捕捞垂钓']
  },
  {
    id: 'day4',
    dayIndex: 4,
    title: 'Day4 江西沟→西海镇',
    from: '江西沟',
    to: '西海镇',
    distance: 102,
    startTime: '09:00',
    description: '09:00出发，最后一日返程。',
    nodes: [
      { id: 'd4n1', km: 30, name: '二郎剑景区', note: '路过' },
      { id: 'd4n2', km: 50, name: '金沙湾/谢玛拉登沙漠', note: '沙岛及金沙湾已于2017年关闭整改，现为自然保护区，禁止进入沙丘，仅可在公路边观赏。经四年修复，沙地植被覆盖率已达60-70%，可见黑颈鹤等野生动物。' },
      { id: 'd4n3', km: 80, name: '湖东种羊场' },
      { id: 'd4n4', km: 102, name: '西海镇', note: '抵达后还车，乘大巴返西宁。' }
    ],
    cultures: [
      {
        title: '金沙湾',
        content: '呈现"海与沙漠"奇观，为青海湖沙化地带。青海湖封闭湖特性使其生态系统脆弱，对污染极敏感。'
      }
    ],
    tips: ['禁止进入沙丘', '还车后乘大巴返西宁']
  }
]

export const initialGearItems: GearItem[] = [
  // shared
  { id: 'g1', name: 'Action4 + 胸前固定带', category: 'daily', owner: 'shared', checked: false, note: '解放双手' },
  { id: 'g2', name: '充电宝10000mAh', category: 'daily', owner: 'shared', checked: false, note: 'Action4续航2.5小时需补电' },
  { id: 'g4', name: '保温杯500ml', category: 'daily', owner: 'shared', checked: false, note: '高原喝热水' },
  { id: 'g5', name: '塑料袋（3个）', category: 'daily', owner: 'shared', checked: false, note: '分装湿衣/脏衣' },
  { id: 'g7', name: '面霜（30g小样）', category: 'care', owner: 'shared', checked: false, note: '高原干燥必备' },
  { id: 'g8', name: '护手霜（小支便携）', category: 'care', owner: 'shared', checked: false },
  // keith
  { id: 'k1', name: '骑行短裤（带海绵垫）', category: 'wear', owner: 'keith', checked: false, note: '自购' },
  { id: 'k2', name: '分体雨衣（上衣+裤子）', category: 'wear', owner: 'keith', checked: false, note: '自购，防风防雨' },
  { id: 'k3', name: '速干长袖', category: 'wear', owner: 'keith', checked: false, note: '2件，每天洗轮换' },
  { id: 'k4', name: '抓绒衣', category: 'wear', owner: 'keith', checked: false, note: '1件，中层保暖' },
  { id: 'k5', name: '冲锋衣', category: 'wear', owner: 'keith', checked: false, note: '已有，外层防风' },
  { id: 'k6', name: '防晒面罩/魔术头巾', category: 'wear', owner: 'keith', checked: false, note: '遮脸防紫外线' },
  { id: 'k7', name: '冰袖', category: 'wear', owner: 'keith', checked: false, note: '1对' },
  { id: 'k8', name: '骑行眼镜/墨镜', category: 'wear', owner: 'keith', checked: false, note: '防风沙必备' },
  { id: 'k9', name: '速干内裤', category: 'wear', owner: 'keith', checked: false, note: '2条' },
  { id: 'k10', name: '厚底速干袜', category: 'wear', owner: 'keith', checked: false, note: '2双，防磨脚' },
  { id: 'k11', name: '轻便拖鞋', category: 'wear', owner: 'keith', checked: false, note: '酒店用' },
  { id: 'k12', name: '日常长裤', category: 'wear', owner: 'keith', checked: false, note: '1条，宽松，套骑行短裤外' },
  { id: 'k13', name: '10L双肩包', category: 'daily', owner: 'keith', checked: false },
  { id: 'k14', name: '矿泉水', category: 'daily', owner: 'keith', checked: false, note: '1杯' },
  { id: 'k15', name: '梳子', category: 'care', owner: 'keith', checked: false },
  { id: 'k16', name: '旅行装（牙刷、洗发水）', category: 'care', owner: 'keith', checked: false },
  // ada
  { id: 'a1', name: '骑行短裤（带海绵垫）', category: 'wear', owner: 'ada', checked: false, note: '自购' },
  { id: 'a2', name: '分体雨衣（上衣+裤子）', category: 'wear', owner: 'ada', checked: false, note: '自购，防风防雨' },
  { id: 'a3', name: '速干长袖', category: 'wear', owner: 'ada', checked: false, note: '2件，每天洗轮换' },
  { id: 'a4', name: '抓绒衣', category: 'wear', owner: 'ada', checked: false, note: '1件，中层保暖' },
  { id: 'a5', name: '冲锋衣', category: 'wear', owner: 'ada', checked: false, note: '已有，外层防风' },
  { id: 'a6', name: '防晒面罩/魔术头巾', category: 'wear', owner: 'ada', checked: false, note: '遮脸防紫外线' },
  { id: 'a7', name: '冰袖', category: 'wear', owner: 'ada', checked: false, note: '1对' },
  { id: 'a8', name: '骑行眼镜/墨镜', category: 'wear', owner: 'ada', checked: false, note: '防风沙必备' },
  { id: 'a9', name: '速干内裤', category: 'wear', owner: 'ada', checked: false, note: '2条' },
  { id: 'a10', name: '厚底速干袜', category: 'wear', owner: 'ada', checked: false, note: '2双，防磨脚' },
  { id: 'a11', name: '轻便拖鞋', category: 'wear', owner: 'ada', checked: false, note: '酒店用' },
  { id: 'a12', name: '日常长裤', category: 'wear', owner: 'ada', checked: false, note: '1条，宽松，套骑行短裤外' },
  { id: 'a13', name: '10L双肩包', category: 'daily', owner: 'ada', checked: false },
  { id: 'a14', name: '矿泉水', category: 'daily', owner: 'ada', checked: false, note: '1杯' },
  { id: 'a15', name: '梳子', category: 'care', owner: 'ada', checked: false },
  { id: 'a16', name: '旅行装（牙刷、洗发水）', category: 'care', owner: 'ada', checked: false },
  { id: 'a17', name: '润唇膏（防晒型SPF15+）', category: 'care', owner: 'ada', checked: false, note: '高原防裂' }
]

export const weatherAdvices: WeatherAdvice[] = [
  {
    scenario: 'sunny',
    label: '晴天骑行',
    temp: '15-20°C',
    outfit: '速干长袖 + 冰袖 + 面罩 + 骑行短裤',
    actions: ['冲锋衣系腰间', '休息时立即穿上防着凉']
  },
  {
    scenario: 'cloudy-windy',
    label: '阴天/大风',
    temp: '8-15°C',
    outfit: '速干长袖 + 抓绒衣 + 冲锋衣 + 骑行短裤',
    actions: ['下坡前必加衣', '体感骤降5-8°C']
  },
  {
    scenario: 'rain-sand',
    label: '雨雪/沙尘',
    temp: '<10°C',
    outfit: '速干长袖 + 分体雨衣（全套） + 骑行眼镜',
    actions: ['雨停后若>15°C脱雨衣换冲锋衣透气', '避免闷汗']
  },
  {
    scenario: 'cold-pass',
    label: '早晚/垭口',
    temp: '<5°C',
    outfit: '速干长袖 + 抓绒衣 + 冲锋衣（或雨衣防风） + 日常长裤（外搭） + 面罩当围脖',
    actions: ['减少停车时间', '保持体温']
  },
  {
    scenario: 'night-hotel',
    label: '夜间酒店',
    temp: '室内',
    outfit: '抓绒衣当睡衣',
    actions: ['清水洗脸→10秒内涂面霜→护手霜→润唇膏']
  }
]

export const departDate = new Date('2026-05-01T00:00:00+08:00')
