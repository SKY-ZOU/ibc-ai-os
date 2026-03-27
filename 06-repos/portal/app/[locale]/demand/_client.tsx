'use client'

export const dynamic = 'force-dynamic'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, ChevronRight, Check, Loader2,
  DollarSign, Tag, MapPin, ShoppingCart, FileText, Building2, Boxes,
  Search, Plus, LayoutGrid, Calendar, Wallet
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const CATEGORIES = [
  '农产品 / Agriculture', '矿产资源 / Minerals', '能源 / Energy',
  '化工品 / Chemicals', '钢铁金属 / Steel & Metals', '纺织品 / Textiles',
  '电子产品 / Electronics', '机械设备 / Machinery', '建材 / Building Materials',
  '消费品 / Consumer Goods', '医疗健康 / Healthcare', '其他 / Others'
]

const CURRENCIES = ['USD', 'CNY', 'EUR', 'HKD', 'GBP', 'JPY']
const UNITS = ['吨 MT', '千克 KG', '件 PCS', '套 SET', '箱 CTN', '立方米 CBM', '升 L', '平方米 SQM']

const PAYMENT_OPTIONS = [
  { value: 'TT', label: 'T/T 电汇', desc: 'Bank Transfer', icon: '🏦' },
  { value: 'LC', label: 'L/C 信用证', desc: 'Letter of Credit', icon: '📄' },
  { value: 'DP', label: 'D/P 付款交单', desc: 'Documents against Payment', icon: '🤝' },
  { value: 'OA', label: 'O/A 赊账', desc: 'Open Account', icon: '📋' },
]

const inputClass = `w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white
  placeholder-slate-500 focus:outline-none focus:border-amber-500/70 focus:bg-slate-800
  transition-all text-sm`
const labelClass = `block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2`

export default function DemandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const t = useTranslations('DemandPage')
  const commonT = useTranslations('Common')
  const isZh = locale === 'zh-CN'

  const [view, setView] = useState<'list' | 'form'>('list')
  const [demands, setDemands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('all')

  // Form states
  const [form, setForm] = useState({
    enterpriseId: '',
    title: '',
    category: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    currency: 'USD',
    quantity: '',
    unit: '',
    deliveryLocation: '',
    paymentPreference: '',
    acceptAlternative: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (view === 'list') {
      fetchDemands()
    }
  }, [view, filterCategory])

  const fetchDemands = async () => {
    setLoading(true)
    try {
      const url = `/api/demand?status=open${filterCategory !== 'all' ? `&category=${encodeURIComponent(filterCategory)}` : ''}`
      const res = await fetch(url)
      const data = await res.json()
      setDemands(data.data || [])
    } catch (err) {
      console.error('Fetch demands error:', err)
    } finally {
      setLoading(false)
    }
  }

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const body: Record<string, unknown> = { ...form }
      if (form.budgetMin) body.budgetMin = parseFloat(form.budgetMin)
      if (form.budgetMax) body.budgetMax = parseFloat(form.budgetMax)
      if (form.quantity) body.quantity = parseInt(form.quantity)

      const res = await fetch('/api/demand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '提交失败')
      setSuccess(data.id || data.demand?.id || 'OK')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="py-20 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
            <Check className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{t('messages.submitSuccess')}</h2>
          <p className="text-slate-400 text-sm mb-8">{isZh ? '您的采购需求已进入全球池，AI 正在为您匹配供应商' : 'Demand posted. AI is matching suppliers for you.'}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setSuccess(null); setView('list') }} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all">
              {isZh ? '浏览所有需求' : 'Browse All Demands'}
            </button>
            <button onClick={() => setSuccess(null)} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all">
              {isZh ? '继续发布' : 'Post Another'}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">{t('title')}</h1>
          <p className="text-slate-500 text-sm">{t('description')}</p>
        </div>

        <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              view === 'list' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {commonT('browse')}
          </button>
          <button
            onClick={() => setView('form')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              view === 'form' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            {commonT('post')}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder={isZh ? '搜索采购需求、关键词...' : 'Search demands, keywords...'} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">{commonT('allCategories')}</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </div>

            {/* List Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : demands.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demands.map((demand) => (
                  <DemandCard key={demand.id} demand={demand} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{commonT('noData')}</h3>
                <p className="text-slate-500 text-sm mb-6">{isZh ? '目前没有符合条件的需求，或者发布您的采购意向' : 'No demands found. Post your RFQ now.'}</p>
                <button onClick={() => setView('form')} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                  {isZh ? '发布我的需求' : 'Post My Demand'}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className={labelClass}>{t('fields.enterpriseId')} *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input className={inputClass + ' pl-10'} placeholder="Company ID" value={form.enterpriseId} onChange={e => set('enterpriseId', e.target.value as string)} required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t('fields.title')} *</label>
                      <input className={inputClass} placeholder="Demand Title" value={form.title} onChange={e => set('title', e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t('fields.category')} *</label>
                        <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)} required>
                          <option value="" disabled>Select Category</option>
                          {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.deliveryLocation')}</label>
                        <input className={inputClass} placeholder="Destination Port/City" value={form.deliveryLocation} onChange={e => set('deliveryLocation', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t('fields.description')}</label>
                      <textarea className={inputClass + ' resize-none'} rows={3} placeholder="Quality, certification requirements..." value={form.description} onChange={e => set('description', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>{t('fields.budgetMin')}</label>
                        <input type="number" className={inputClass} placeholder="Min" value={form.budgetMin} onChange={e => set('budgetMin', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.budgetMax')}</label>
                        <input type="number" className={inputClass} placeholder="Max" value={form.budgetMax} onChange={e => set('budgetMax', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.currency')}</label>
                        <select className={inputClass} value={form.currency} onChange={e => set('currency', e.target.value)}>
                          {CURRENCIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t('fields.quantity')}</label>
                        <input type="number" className={inputClass} placeholder="Amount" value={form.quantity} onChange={e => set('quantity', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.unit')}</label>
                        <select className={inputClass} value={form.unit} onChange={e => set('unit', e.target.value)}>
                          <option value="" className="bg-slate-900">Unit</option>
                          {UNITS.map(u => <option key={u} value={u} className="bg-slate-900">{u}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t('fields.paymentPreference')}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {PAYMENT_OPTIONS.map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => set('paymentPreference', form.paymentPreference === opt.value ? '' : opt.value)}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                              form.paymentPreference === opt.value ? 'border-amber-500/60 bg-amber-500/10' : 'border-white/10 bg-white/5'
                            }`}
                          >
                            <span className="text-lg">{opt.icon}</span>
                            <span className={`text-xs font-bold ${form.paymentPreference === opt.value ? 'text-amber-400' : 'text-slate-400'}`}>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-10 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Target className="w-5 h-5" /> {t('submit')}</>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemandCard({ demand, locale }: { demand: any; locale: string }) {
  const isZh = locale === 'zh-CN'
  return (
    <Link href={`/${locale}/enterprise/${demand.enterpriseId}`} className="group block h-full">
      <div className="h-full flex flex-col bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <ShoppingCart className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">{isZh ? '交付地' : 'Delivery'}</span>
            <span className="text-xs font-bold text-white line-clamp-1">{demand.deliveryLocation || 'Global'}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">{demand.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
            {demand.category.split('/')[0].trim()}
          </span>
          {demand.acceptAlternative && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
              {isZh ? '接受替代方案' : 'Alt Acceptable'}
            </span>
          )}
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">
          {demand.description || (isZh ? '暂无需求描述...' : 'No description provided...')}
        </p>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{isZh ? '预算规模' : 'Budget'}</div>
              <div className="text-amber-500 font-black text-lg">
                {demand.budgetMin && demand.budgetMax 
                  ? `${demand.currency} ${demand.budgetMin} - ${demand.budgetMax}`
                  : demand.budgetMin ? `${demand.currency} ${demand.budgetMin}` : (isZh ? '面议' : 'Negotiable')}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{isZh ? '数量需求' : 'Quantity'}</div>
              <div className="text-white font-bold text-sm">{demand.quantity ? `${demand.quantity} ${demand.unit || ''}` : 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/20">
              <Building2 className="w-3 h-3 text-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 line-clamp-1">{demand.enterprise?.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
            <Wallet className="w-3 h-3" />
            {demand.paymentPreference || 'ANY'}
          </div>
        </div>
      </div>
    </Link>
  )
}
