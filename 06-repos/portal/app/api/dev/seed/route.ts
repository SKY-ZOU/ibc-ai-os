/**
 * DEV ONLY: POST /api/dev/seed
 * 写入演示数据：6家企业 + 产品 + 需求，然后触发匹配
 * 生产环境（NODE_ENV=production）禁止访问
 */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { runMatching } from '@/lib/matching-engine'

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ success: false, error: 'Not available in production' }, { status: 403 })
  }

  // 清空现有演示数据（system 除外）
  await prisma.opportunityMatch.deleteMany()
  await prisma.opportunity.deleteMany()
  await prisma.demand.deleteMany()
  await prisma.product.deleteMany()
  await prisma.enterprise.deleteMany({ where: { NOT: { id: 'system' } } })

  // ── 企业 ────────────────────────────────────────────────────────
  const enterprises = await prisma.enterprise.createManyAndReturn({
    data: [
      {
        name: '新疆天工能源贸易有限公司',
        nameEn: 'Xinjiang Tiangong Energy Trading',
        industry: '能源 / Energy',
        country: '中国',
        city: '乌鲁木齐',
        contactName: '张伟',
        email: 'zhang@tiangong.cn',
        phone: '+86-991-0001001',
        description: '专注中亚原油及天然气进出口贸易，年贸易额逾5亿美元。',
        tradeDirection: 'both',
        paymentPreference: 'rmb',
        status: 'approved',
      },
      {
        name: 'KazEnergy Group',
        nameEn: 'KazEnergy Group',
        industry: '能源 / Energy',
        country: '哈萨克斯坦',
        city: 'Almaty',
        contactName: 'Aibek Nurmagambetov',
        email: 'aibek@kazэнergy.kz',
        phone: '+7-727-0001001',
        description: 'Leading Kazakhstan energy trading company. Monthly supply of 50k barrels crude oil.',
        tradeDirection: 'export',
        paymentPreference: 'stablecoin',
        status: 'approved',
      },
      {
        name: '粤海机械设备进出口',
        nameEn: 'Yuehai Machinery Import & Export',
        industry: '机械设备 / Machinery',
        country: '中国',
        city: '广州',
        contactName: '李明',
        email: 'li@yuehai.cn',
        phone: '+86-20-0001002',
        description: '华南最大农业机械和工程机械贸易商，覆盖东南亚及非洲市场。',
        tradeDirection: 'export',
        paymentPreference: 'mixed',
        status: 'approved',
      },
      {
        name: 'AgroBrasil Ltda',
        nameEn: 'AgroBrasil Ltda',
        industry: '农产品 / Agriculture',
        country: '巴西',
        city: 'São Paulo',
        contactName: 'Carlos Mendes',
        email: 'carlos@agrobrasil.com.br',
        phone: '+55-11-0001003',
        description: 'Brazilian agri-trading company. Import Chinese agricultural machinery and construction equipment.',
        tradeDirection: 'import',
        paymentPreference: 'usd',
        status: 'approved',
      },
      {
        name: '南非阳光矿产资源',
        nameEn: 'Sunshine Minerals South Africa',
        industry: '矿产资源 / Minerals',
        country: '南非',
        city: 'Johannesburg',
        contactName: 'Thabo Nkosi',
        email: 'thabo@sunshine-minerals.co.za',
        phone: '+27-11-0001004',
        description: 'Chromite and manganese ore producer. Seeking Chinese electronics and textiles in exchange.',
        tradeDirection: 'both',
        paymentPreference: 'stablecoin',
        status: 'approved',
      },
      {
        name: '新加坡隆兴电子贸易',
        nameEn: 'Longxing Electronics Singapore',
        industry: '电子产品 / Electronics',
        country: '新加坡',
        city: 'Singapore',
        contactName: 'Wei Chen',
        email: 'wei@longxing.sg',
        phone: '+65-6001005',
        description: 'Electronics distribution hub. Procure from China and distribute to Southeast Asia and Middle East.',
        tradeDirection: 'import',
        paymentPreference: 'usd',
        status: 'approved',
      },
    ],
  })

  const [tiangong, kazEnergy, yuehai, agroBrasil, sunshine, longxing] = enterprises

  // ── 产品（供给） ─────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        enterpriseId: tiangong.id,
        name: '哈萨克斯坦原油 Brent 62°',
        nameEn: 'Kazakhstan Crude Oil Brent 62°',
        category: '能源 / Energy',
        description: '月供 5 万桶，API 62°，品质稳定，可接受以货换货（机械/电子）',
        priceMin: 75, priceMax: 85, currency: 'USD', unit: '桶/BBL',
        minQty: 10000, maxQty: 50000, leadTime: 30,
        origin: '哈萨克斯坦', status: 'active',
      },
      {
        enterpriseId: kazEnergy.id,
        name: 'Crude Oil Kazakhstan Light',
        nameEn: 'Kazakhstan Light Crude Oil',
        category: '能源 / Energy',
        description: 'Kazakhstan Light crude, monthly supply 30k–80k barrels. Accept USDT or barter with machinery.',
        priceMin: 72, priceMax: 82, currency: 'USD', unit: 'BBL',
        minQty: 30000, maxQty: 80000, leadTime: 25,
        origin: '哈萨克斯坦', status: 'active',
      },
      {
        enterpriseId: yuehai.id,
        name: '东方红-2204 拖拉机',
        nameEn: 'Dongfanghong 2204 Tractor',
        category: '机械设备 / Machinery',
        description: '220 马力四驱拖拉机，适合热带农业，已出口巴西/越南/肯尼亚超 5000 台',
        priceMin: 45000, priceMax: 55000, currency: 'USD', unit: '台',
        minQty: 5, maxQty: 300, leadTime: 60,
        origin: '中国', status: 'active',
      },
      {
        enterpriseId: yuehai.id,
        name: '沃得锐龙 5 联合收割机',
        nameEn: 'World Combine Harvester WR50',
        category: '机械设备 / Machinery',
        description: '5 公斤/秒喂入量，适合大豆、水稻、小麦。CKD 散件可降低进口税。',
        priceMin: 60000, priceMax: 75000, currency: 'USD', unit: '台',
        minQty: 3, maxQty: 100, leadTime: 75,
        origin: '中国', status: 'active',
      },
      {
        enterpriseId: sunshine.id,
        name: 'Chromite Ore UG2 Concentrate',
        nameEn: 'South Africa Chromite Ore',
        category: '矿产资源 / Minerals',
        description: 'UG2 chromite concentrate, Cr2O3 42%+. Monthly supply 5,000–20,000 MT. Will barter for electronics.',
        priceMin: 280, priceMax: 350, currency: 'USD', unit: 'MT',
        minQty: 5000, maxQty: 20000, leadTime: 45,
        origin: '南非', status: 'active',
      },
    ],
  })

  // ── 需求 ─────────────────────────────────────────────────────────
  await prisma.demand.createMany({
    data: [
      {
        enterpriseId: agroBrasil.id,
        title: '采购中国农业机械 200 台（拖拉机+收割机）',
        titleEn: 'Procurement of 200 Chinese Agricultural Machines',
        category: '机械设备 / Machinery',
        description: '年采购量 150 台拖拉机 + 50 台联合收割机，用于巴西马托格罗索州大豆农场，优先考虑易货（以大豆/铁矿石抵扣）',
        budgetMin: 8000000, budgetMax: 12000000, currency: 'USD',
        quantity: 200, unit: '台',
        deliveryLocation: '巴西',
        paymentPreference: 'mixed',
        acceptAlternative: true,
        status: 'open',
      },
      {
        enterpriseId: longxing.id,
        title: '采购消费电子产品 智能手机/平板 10 万件',
        titleEn: 'Procurement 100K Consumer Electronics',
        category: '电子产品 / Electronics',
        description: 'Seeking Android smartphones (4G/5G) and tablets for distribution in SEA and Middle East. Open to barter with energy resources.',
        budgetMin: 3000000, budgetMax: 8000000, currency: 'USD',
        quantity: 100000, unit: '件',
        deliveryLocation: '新加坡',
        paymentPreference: 'usd',
        acceptAlternative: false,
        status: 'open',
      },
      {
        enterpriseId: sunshine.id,
        title: 'Procurement of Electronics for Barter',
        titleEn: 'Electronics procurement via barter',
        category: '电子产品 / Electronics',
        description: 'Seeking Chinese consumer electronics (phones, laptops, tablets) to distribute in sub-Saharan Africa. Will pay with chromite ore.',
        budgetMin: 1000000, budgetMax: 5000000, currency: 'USD',
        quantity: 50000, unit: '件',
        deliveryLocation: '南非',
        paymentPreference: 'stablecoin',
        acceptAlternative: true,
        status: 'open',
      },
      {
        enterpriseId: kazEnergy.id,
        title: 'Agricultural Machinery for Oil Barter',
        titleEn: 'Barter: Oil for Agricultural Machinery',
        category: '机械设备 / Machinery',
        description: 'We offer crude oil in exchange for Chinese-made tractors and harvesters for Kazakhstan farms.',
        budgetMin: 2000000, budgetMax: 5000000, currency: 'USD',
        quantity: 50, unit: '台',
        deliveryLocation: '哈萨克斯坦',
        paymentPreference: 'stablecoin',
        acceptAlternative: true,
        status: 'open',
      },
      {
        enterpriseId: tiangong.id,
        title: '采购铬铁矿 UG2 精矿 1–2 万吨/月',
        titleEn: 'Chromite Ore Monthly Procurement',
        category: '矿产资源 / Minerals',
        description: '铬铁精矿，Cr2O3 ≥40%，月采购量 1–2 万吨，可用人民币或稳定币结算',
        budgetMin: 3000000, budgetMax: 7000000, currency: 'USD',
        quantity: 15000, unit: 'MT',
        deliveryLocation: '中国',
        paymentPreference: 'rmb',
        acceptAlternative: false,
        status: 'open',
      },
    ],
  })

  // ── 触发匹配 ─────────────────────────────────────────────────────
  const matchResult = await runMatching({ useAI: false })

  return NextResponse.json({
    success: true,
    message: '演示数据写入完成',
    data: {
      enterprises: enterprises.length,
      matchResult,
    },
  })
}
