'use client'

import { useState, use } from 'react'
import { motion, type Variants } from 'framer-motion'

const MOCK_DATA = [
  { id:'O001', flag:'🇦🇺', title:'铁矿石 62% Fe', company:'Pilbara Resources', value:'$4.25M', days:1, ai:94, cat:'矿产' },
  { id:'O002', flag:'🇧🇷', title:'非转基因大豆 50,000吨', company:'Cerrado Agri Group', value:'$3.8M', days:2, ai:88, cat:'农业' },
  { id:'O003', flag:'🇨🇱', title:'铜精矿 Cu 28%', company:'Atacama Mining', value:'$18.4M', days:8, ai:97, cat:'矿产' },
  { id:'O004', flag:'🇸🇦', title:'原油 Arabian Light', company:'Saudi Energy Corp', value:'$52M', days:3, ai:91, cat:'能源' },
  { id:'O005', flag:'🇩🇪', title:'工业机器人 ABB IRB', company:'Munich Automation', value:'$2.1M', days:5, ai:82, cat:'机械' },
  { id:'O006', flag:'🇻🇳', title:'贴片电容 0402 1亿只', company:'Hanoi Electronics', value:'$850K', days:3, ai:79, cat:'电子' },
  { id:'O007', flag:'🇮🇳', title:'甲醇工业级 5000吨', company:'Mumbai Chem Industries', value:'$8.4M', days:6, ai:89, cat:'化工' },
  { id:'O008', flag:'🇰🇪', title:'光伏组件 545W 10MW', company:'Nairobi Solar Ltd', value:'$5.6M', days:12, ai:92, cat:'能源' },
  { id:'O009', flag:'🇳🇬', title:'施工挖掘机 50台', company:'Lagos Industrial', value:'$1.4M', days:4, ai:73, cat:'机械' },
  { id:'O010', flag:'🇿🇦', title:'铬铁矿 UG2精矿', company:'JHB Chrome Co.', value:'$3.25M', days:5, ai:91, cat:'矿产' },
  { id:'O011', flag:'🇲🇾', title:'棕榈油 RBD精炼', company:'KL Agri Trading', value:'$2.7M', days:7, ai:86, cat:'农业' },
  { id:'O012', flag:'🇷🇺', title:'化肥 尿素 46%', company:'Ural Chemicals', value:'$6.2M', days:9, ai:84, cat:'化工' },
  { id:'O013', flag:'🇹🇷', title:'纺织面料 棉质混纺', company:'Istanbul Textile', value:'$1.1M', days:14, ai:77, cat:'其他' },
  { id:'O014', flag:'🇯🇵', title:'精密轴承 SKF级', company:'Osaka Precision', value:'$980K', days:11, ai:83, cat:'机械' },
  { id:'O015', flag:'🇮🇩', title:'镍矿石 1.8% Ni', company:'Sulawesi Mining', value:'$9.8M', days:6, ai:95, cat:'矿产' },
]

const CATEGORIES = ['全部', '矿产', '农业', '能源', '化工', '电子', '机械', '其他']

const CAT_COLORS: Record<string, string> = {
  矿产: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  农业: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  能源: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  化工: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  电子: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  机械: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  其他: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

function aiColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  if (score >= 80) return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  const [activeTab, setActiveTab] = useState('全部')
  const [search, setSearch] = useState('')

  const filtered = MOCK_DATA.filter((item) => {
    const matchCat = activeTab === '全部' || item.cat === activeTab
    const q = search.toLowerCase()
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.company.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={`/${locale}`}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              首页
            </a>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">IBC</span>
              </div>
              <span className="text-white font-semibold text-sm">全球商机</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/${locale}/supply`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#020617] font-bold text-sm rounded-lg transition-colors"
            >
              + 发布供给
            </a>
            <a
              href={`/${locale}/demand`}
              className="hidden sm:inline-flex px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg transition-colors border border-slate-700"
            >
              + 发布需求
            </a>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div className="border-b border-slate-800/60 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black text-white mb-2"
          >
            🌐 全球商机
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-slate-400 text-base mb-8"
          >
            AI 实时匹配全球供需，发现最适合您的跨境贸易机会
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative max-w-lg"
          >
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索商品、公司…"
              className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </motion.div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-slate-800/40 px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-1 py-3 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === cat
                  ? 'bg-amber-500 text-[#020617]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-slate-500 text-sm mb-6">
          共 <span className="text-white font-semibold">{filtered.length}</span> 条商机
        </p>
        <motion.div
          key={`${activeTab}-${search}`}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              variants={cardAnim}
              whileHover={{ scale: 1.02, borderColor: 'rgba(245,158,11,0.4)' }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 cursor-pointer transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{item.flag}</span>
                  <span className="font-bold text-white text-sm leading-snug line-clamp-2">{item.title}</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-sm whitespace-nowrap flex-shrink-0">
                  {item.value}
                </span>
              </div>

              {/* Company */}
              <p className="text-slate-400 text-xs mb-4 pl-8">{item.company}</p>

              {/* Bottom row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CAT_COLORS[item.cat] ?? 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                  {item.cat}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${aiColor(item.ai)}`}>
                  AI {item.ai}%
                </span>
                <span className="text-xs text-slate-500 ml-auto">
                  剩余 <span className={item.days <= 3 ? 'text-rose-400 font-semibold' : 'text-slate-400'}>{item.days}</span> 天
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <div className="text-5xl mb-4">🔍</div>
            <p>暂无匹配的商机</p>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#020617]/95 backdrop-blur-md border-t border-slate-800/60">
        <div className="grid grid-cols-4 gap-0">
          {[
            { label: '首页', href: `/${locale}`, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: false },
            { label: '供给', href: `/${locale}/supply`, icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', active: false },
            { label: '需求', href: `/${locale}/demand`, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', active: false },
            { label: '机会', href: `/${locale}/opportunities`, icon: 'M13 10V3L4 14h7v7l9-11h-7z', active: true },
          ].map((nav) => (
            <a
              key={nav.label}
              href={nav.href}
              className={`flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors ${
                nav.active ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={nav.icon} />
              </svg>
              {nav.label}
            </a>
          ))}
        </div>
      </nav>

      {/* bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </div>
  )
}
