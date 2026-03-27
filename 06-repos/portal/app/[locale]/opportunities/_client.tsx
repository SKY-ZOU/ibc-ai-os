'use client'

export const dynamic = 'force-dynamic'

import { useState, use, useEffect } from 'react'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, Plus, LayoutGrid, ArrowRight, 
  MessageSquare, TrendingUp, Clock, Globe, Building2,
  ChevronRight, ArrowLeft, Loader2, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const CATEGORIES = ['全部', '矿产', '农业', '能源', '化工', '电子', '机械', '其他']

const CAT_COLORS: Record<string, string> = {
  '矿产': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  '农业': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '能源': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  '化工': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  '电子': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '机械': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  '其他': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function OpportunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const isZh = locale === 'zh-CN'
  const commonT = useTranslations('Common')

  const [activeTab, setActiveTab] = useState('全部')
  const [search, setSearch] = useState('')
  const [opps, setOpps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/opportunities')
      const data = await res.json()
      setOpps(data.data || [])
    } catch (err) {
      console.error('Fetch opportunities error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = opps.filter((item) => {
    const matchCat = activeTab === '全部' || (item.category && item.category.includes(activeTab))
    const q = search.toLowerCase()
    const matchSearch = !q || item.title.toLowerCase().includes(q) || (item.enterprise?.name || '').toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase mb-4">
              <Sparkles className="w-3 h-3" />
              {isZh ? 'AI 实时匹配' : 'AI Real-time Matching'}
            </div>
            <h1 className="text-4xl font-black text-white mb-4">
              {isZh ? '全球商机池' : 'Global Opps Pool'}
            </h1>
            <p className="text-slate-500 max-w-xl">
              {isZh 
                ? 'AI 引擎从全球供需库中筛选出的高质量贸易机会。您可以直接联系匹配方发起谈判。' 
                : 'High-quality trade opportunities filtered by AI from the global pool. Connect and negotiate directly.'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/${locale}/supply`} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all text-sm">
              {isZh ? '+ 发布供给' : '+ Post Supply'}
            </Link>
            <Link href={`/${locale}/demand`} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm">
              {isZh ? '+ 发布需求' : '+ Post Demand'}
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isZh ? '搜索商机、企业或关键词...' : 'Search opportunities, companies...'}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat ? 'bg-amber-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item) => (
              <OpportunityCard key={item.id} item={item} locale={locale} commonT={commonT} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[40px]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{isZh ? '暂无匹配商机' : 'No Opportunities Found'}</h3>
            <p className="text-slate-500 mb-8">{isZh ? '尝试更换搜索词，或发布您的第一个需求' : 'Try different filters or post your first demand.'}</p>
            <Link href={`/${locale}/demand`} className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all">
              {isZh ? '发布需求' : 'Post Demand'}
            </Link>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AIReason } from '@/components/ui/ai-reason'

function OpportunityCard({ item, locale, commonT }: { item: any; locale: string; commonT: any }) {
  const isZh = locale === 'zh-CN'
  const score = item.aiScore ?? item.probability ?? 75
  const reason = item.aiReason || item.description || (isZh
    ? '供需品类高度吻合，贸易路线畅通。'
    : 'Strong category match with viable trade route.')
  const [contacting, setContacting] = useState(false)
  const [contacted, setContacted] = useState(false)

  const handleContact = async () => {
    if (contacted) return
    setContacting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: item.id,
          targetEnterpriseId: item.enterpriseId,
          notes: isZh ? '通过商机池发起接触' : 'Initiated from opportunity pool',
        }),
      })
      setContacted(true)
    } finally {
      setContacting(false)
    }
  }
  
  return (
    <Card 
      glow 
      glowColor="amber"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={cardAnim}
      className="flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.enterprise?.country || 'GLOBAL'}</div>
            <div className="text-xs font-bold text-slate-300 line-clamp-1">{item.enterprise?.name}</div>
          </div>
        </div>
        <AIReason score={score} reason={reason} isZh={isZh} />
      </div>

      <h3 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
        {item.title}
      </h3>
      
      <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
        {item.description || (isZh ? 'AI 正在对该商机进行深度画像分析...' : 'AI is performing deep profile analysis...')}
      </p>

      <div className="flex items-center gap-2 mb-8">
        <Badge variant="amber" size="xs">
          {item.category || (isZh ? '其他' : 'Other')}
        </Badge>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 ml-auto">
          <Clock className="w-3.5 h-3.5" />
          {isZh ? '剩余 5 天' : '5 Days Left'}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{isZh ? '估值' : 'Value'}</div>
          <div className="text-white font-black text-lg">
            {item.value ? `${item.currency} ${item.value.toLocaleString()}` : (isZh ? '面议' : 'P.O.A')}
          </div>
        </div>
        <button
          onClick={handleContact}
          disabled={contacting || contacted}
          className={`px-5 py-2.5 font-black text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 ${
            contacted
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/10 disabled:opacity-60'
          }`}
        >
          {contacting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : contacted ? (
            isZh ? '✅ 已发起' : '✅ Sent'
          ) : (
            <>
              {isZh ? '发起接触' : 'Connect'}
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </Card>
  )
}
