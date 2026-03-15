import { NextRequest, NextResponse } from 'next/server'

const AGENT_BASE = process.env.AI_TRADE_AGENT_URL || 'http://localhost:3003'

// Mock fallback data when agent is unavailable
function getMockMatches(searchParams: URLSearchParams) {
  const type = searchParams.get('type') || ''
  const category = searchParams.get('category') || ''
  const country = searchParams.get('country') || ''
  const q = searchParams.get('q') || ''

  const allMatches = [
    {
      id: 'm001', type: 'supply', category: 'energy', aiScore: 96,
      title: '哈萨克斯坦原油供给 · Kazakh Crude Oil Supply',
      company: '哈能源集团', companyEn: 'KazEnergy Group',
      country: 'Kazakhstan', flag: '🇰🇿',
      tags: ['原油', 'Crude Oil', 'USDT', 'RMB'],
      value: '$2,000,000', currency: 'USD',
      description: '月供 5 万桶优质原油，支持 USDT/RMB 结算，可接受以货易货',
    },
    {
      id: 'm002', type: 'demand', category: 'machinery', aiScore: 91,
      title: '巴西农机采购需求 · Brazilian Agricultural Machinery',
      company: 'AgroBrasil Ltda', companyEn: 'AgroBrasil Ltda',
      country: 'Brazil', flag: '🇧🇷',
      tags: ['农机', 'Machinery', 'BRL', 'USD'],
      value: '$500,000', currency: 'USD',
      description: '寻找中国农业机械供应商，年采购量 200 台拖拉机',
    },
    {
      id: 'm003', type: 'supply', category: 'agriculture', aiScore: 88,
      title: '印度有机香料出口 · Indian Organic Spices',
      company: 'Spice India Co.', companyEn: 'Spice India Co.',
      country: 'India', flag: '🇮🇳',
      tags: ['香料', 'Spices', 'INR', 'USD'],
      value: '$120,000', currency: 'USD',
      description: '有机认证香料，包括姜黄、胡椒、小豆蔻，支持定制规格',
    },
    {
      id: 'm004', type: 'demand', category: 'electronics', aiScore: 84,
      title: '肯尼亚电子设备采购 · Kenya Electronics Procurement',
      company: 'Nairobi Tech Hub', companyEn: 'Nairobi Tech Hub',
      country: 'Kenya', flag: '🇰🇪',
      tags: ['电子', 'Electronics', 'KES', 'USDT'],
      value: '$80,000', currency: 'USD',
      description: '采购笔记本电脑、平板及网络设备用于政府数字化项目',
    },
    {
      id: 'm005', type: 'supply', category: 'chemicals', aiScore: 79,
      title: '俄罗斯化工原料 · Russian Chemical Materials',
      company: 'RussChem Trading', companyEn: 'RussChem Trading',
      country: 'Russia', flag: '🇷🇺',
      tags: ['化工', 'Chemicals', 'RMB', 'USDT'],
      value: '$350,000', currency: 'USD',
      description: '工业级化工原料，包括甲醇、丙酮、乙烯，长期稳定供货',
    },
    {
      id: 'm006', type: 'demand', category: 'textiles', aiScore: 73,
      title: '南非纺织品采购 · South Africa Textile Sourcing',
      company: 'Cape Town Fabrics', companyEn: 'Cape Town Fabrics',
      country: 'South Africa', flag: '🇿🇦',
      tags: ['纺织', 'Textiles', 'USD', 'USDC'],
      value: '$200,000', currency: 'USD',
      description: '寻找中国棉纺织品生产商，年采购量 50 万米布料',
    },
    {
      id: 'm007', type: 'supply', category: 'metals', aiScore: 67,
      title: '智利铜矿石供应 · Chilean Copper Ore',
      company: 'Minera Chile SA', companyEn: 'Minera Chile SA',
      country: 'Chile', flag: '🇨🇱',
      tags: ['铜矿', 'Copper', 'USD', 'USDT'],
      value: '$1,500,000', currency: 'USD',
      description: '高品位铜矿石，品位 35%+，月供 2 万吨，FOB 价格',
    },
    {
      id: 'm008', type: 'demand', category: 'food', aiScore: 61,
      title: '越南食品原料采购 · Vietnam Food Ingredients',
      company: 'Hanoi Foods Corp', companyEn: 'Hanoi Foods Corp',
      country: 'Vietnam', flag: '🇻🇳',
      tags: ['食品', 'Food', 'USD', 'CNY'],
      value: '$60,000', currency: 'USD',
      description: '采购中国食品添加剂及调味料用于本地食品加工',
    },
  ]

  return allMatches.filter((m) => {
    if (type && type !== 'all' && m.type !== type) return false
    if (category && category !== 'all' && m.category !== category) return false
    if (country && !m.country.toLowerCase().includes(country.toLowerCase())) return false
    if (q) {
      const lq = q.toLowerCase()
      return (
        m.title.toLowerCase().includes(lq) ||
        m.company.toLowerCase().includes(lq) ||
        m.country.toLowerCase().includes(lq) ||
        m.tags.some((t) => t.toLowerCase().includes(lq))
      )
    }
    return true
  })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  try {
    const url = new URL('/api/match', AGENT_BASE)
    searchParams.forEach((v, k) => url.searchParams.set(k, v))

    const res = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) throw new Error(`Agent responded ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ success: true, data: getMockMatches(searchParams), source: 'mock' })
  }
}
