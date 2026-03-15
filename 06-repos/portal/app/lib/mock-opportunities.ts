export type OppType = 'supply' | 'demand'
export type OppStage = 'new' | 'intent' | 'negotiation' | 'contract' | 'closed'

export interface MockOpportunity {
  id: string
  type: OppType
  flag: string
  country: string
  countryCode: string
  company: string
  category: string
  title: string
  quantity: string
  unit: string
  price: string
  currency: string
  value: number        // USD estimate
  aiScore: number      // 0-100
  settlement: string[] // accepted settlement methods
  tags: string[]
  postedDays: number
  stage: OppStage
  contactName: string
}

const OPPS: MockOpportunity[] = [
  {
    id: 'op-001', type: 'supply', flag: '🇦🇺', country: '澳大利亚', countryCode: 'AU',
    company: 'Pilbara Resources Ltd.', category: 'minerals',
    title: '铁矿石 62% Fe', quantity: '50,000', unit: 'MT', price: '$85', currency: 'USD',
    value: 4250000, aiScore: 94, settlement: ['USDT', 'RMB', 'USD'],
    tags: ['铁矿石', '大宗', '长协'], postedDays: 2, stage: 'new', contactName: 'James W.',
  },
  {
    id: 'op-002', type: 'supply', flag: '🇧🇷', country: '巴西', countryCode: 'BR',
    company: 'Cerrado Agri Group', category: 'agri',
    title: '非转基因大豆（散装）', quantity: '10,000', unit: 'MT', price: '$380', currency: 'USD',
    value: 3800000, aiScore: 88, settlement: ['USDT', 'USDC', 'BRL'],
    tags: ['大豆', '农产品', '非转基因'], postedDays: 5, stage: 'new', contactName: 'Carlos M.',
  },
  {
    id: 'op-003', type: 'supply', flag: '🇿🇦', country: '南非', countryCode: 'ZA',
    company: 'Johannesburg Chrome Co.', category: 'minerals',
    title: '铬铁矿 UG2 精矿', quantity: '5,000', unit: 'MT', price: '$650', currency: 'USD',
    value: 3250000, aiScore: 91, settlement: ['USDT', 'USD'],
    tags: ['铬矿', '精矿', 'UG2'], postedDays: 1, stage: 'intent', contactName: 'Thabo N.',
  },
  {
    id: 'op-004', type: 'supply', flag: '🇷🇺', country: '俄罗斯', countryCode: 'RU',
    company: 'Siberian Timber Export', category: 'materials',
    title: '西伯利亚落叶松原木', quantity: '8,000', unit: 'm³', price: '$320', currency: 'USD',
    value: 2560000, aiScore: 76, settlement: ['RMB', 'USDT'],
    tags: ['木材', '落叶松', '原木'], postedDays: 8, stage: 'new', contactName: 'Ivan P.',
  },
  {
    id: 'op-005', type: 'supply', flag: '🇨🇱', country: '智利', countryCode: 'CL',
    company: 'Atacama Copper Mining', category: 'minerals',
    title: '铜精矿 Cu 28%', quantity: '2,000', unit: 'MT', price: '$9,200', currency: 'USD',
    value: 18400000, aiScore: 97, settlement: ['USDT', 'USDC', 'USD'],
    tags: ['铜矿', '精矿', '高品位'], postedDays: 3, stage: 'negotiation', contactName: 'Diego R.',
  },
  {
    id: 'op-006', type: 'supply', flag: '🇻🇳', country: '越南', countryCode: 'VN',
    company: 'Hanoi Electronics Mfr.', category: 'electronics',
    title: 'SMD 贴片电容（0402 系列）', quantity: '5,000,000', unit: 'pcs', price: '$0.012', currency: 'USD',
    value: 60000, aiScore: 82, settlement: ['USDT', 'RMB', 'USD'],
    tags: ['电容', 'SMD', '电子元件'], postedDays: 6, stage: 'new', contactName: 'Nguyen T.',
  },
  {
    id: 'op-007', type: 'supply', flag: '🇮🇩', country: '印度尼西亚', countryCode: 'ID',
    company: 'Java Textile Factory', category: 'textiles',
    title: '棉麻混纺坯布（130gsm）', quantity: '200,000', unit: 'm', price: '$2.8', currency: 'USD',
    value: 560000, aiScore: 79, settlement: ['USDT', 'USD'],
    tags: ['纺织', '坯布', '棉麻'], postedDays: 10, stage: 'new', contactName: 'Budi S.',
  },
  {
    id: 'op-008', type: 'demand', flag: '🇨🇳', country: '中国', countryCode: 'CN',
    company: '武汉钢铁集团', category: 'minerals',
    title: '求购：高品位铁矿石', quantity: '100,000', unit: 'MT', price: '$80–90', currency: 'USD',
    value: 8500000, aiScore: 96, settlement: ['RMB', 'USDT'],
    tags: ['铁矿石', '求购', '季度采购'], postedDays: 1, stage: 'new', contactName: '李总',
  },
  {
    id: 'op-009', type: 'demand', flag: '🇳🇬', country: '尼日利亚', countryCode: 'NG',
    company: 'Lagos Industrial Corp.', category: 'machinery',
    title: '求购：工程施工设备（挖掘机）', quantity: '50', unit: '台', price: '$28,000', currency: 'USD',
    value: 1400000, aiScore: 73, settlement: ['USDT', 'USD'],
    tags: ['挖掘机', '工程设备', '新兴市场'], postedDays: 4, stage: 'intent', contactName: 'Emeka O.',
  },
  {
    id: 'op-010', type: 'demand', flag: '🇵🇰', country: '巴基斯坦', countryCode: 'PK',
    company: 'Karachi Garment Mills', category: 'textiles',
    title: '求购：棉花原料（长绒棉）', quantity: '500,000', unit: 'kg', price: '$2.1', currency: 'USD',
    value: 1050000, aiScore: 85, settlement: ['USDT', 'USDC'],
    tags: ['棉花', '长绒棉', '原料'], postedDays: 7, stage: 'new', contactName: 'Rashid A.',
  },
  {
    id: 'op-011', type: 'demand', flag: '🇮🇳', country: '印度', countryCode: 'IN',
    company: 'Mumbai Chem Industries', category: 'chemicals',
    title: '求购：甲醇（工业级）', quantity: '20,000', unit: 'MT', price: '$420', currency: 'USD',
    value: 8400000, aiScore: 89, settlement: ['USDT', 'USD', 'INR'],
    tags: ['甲醇', '化工', '工业级'], postedDays: 2, stage: 'negotiation', contactName: 'Raj P.',
  },
  {
    id: 'op-012', type: 'demand', flag: '🇰🇪', country: '肯尼亚', countryCode: 'KE',
    company: 'Nairobi Solar Projects', category: 'energy',
    title: '求购：光伏组件（545W）', quantity: '20,000', unit: '片', price: '$0.28', currency: 'USD',
    value: 5600000, aiScore: 92, settlement: ['USDT', 'USDC', 'KES'],
    tags: ['光伏', '新能源', '组件'], postedDays: 3, stage: 'contract', contactName: 'Amina K.',
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  minerals: '矿产资源', agri: '农业大宗', textiles: '纺织轻工',
  electronics: '电子元件', materials: '建材木材', machinery: '机械设备',
  chemicals: '化工原料', energy: '能源光伏',
}

export function getMockOpportunities() { return OPPS }

export function getOppById(id: string) { return OPPS.find((o) => o.id === id) }
