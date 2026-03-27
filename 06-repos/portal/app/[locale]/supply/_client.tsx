'use client'

export const dynamic = 'force-dynamic'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, ChevronRight, Check, Loader2,
  DollarSign, Tag, Globe, Hash, Boxes, Clock, FileText, Building2,
  Search, Filter, Plus, LayoutGrid, List as ListIcon, Info
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

const inputClass = `w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white
  placeholder-slate-500 focus:outline-none focus:border-amber-500/70 focus:bg-slate-800
  transition-all text-sm`
const labelClass = `block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2`

export default function SupplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const t = useTranslations('SupplyPage')
  const commonT = useTranslations('Common')
  const isZh = locale === 'zh-CN'

  const [view, setView] = useState<'list' | 'form'>('list')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('all')

  // Form states
  const [form, setForm] = useState({
    enterpriseId: '',
    name: '',
    category: '',
    description: '',
    priceMin: '',
    priceMax: '',
    currency: 'USD',
    unit: '',
    minQty: '',
    leadTime: '',
    hsCode: '',
    origin: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (view === 'list') {
      fetchProducts()
    }
  }, [view, filterCategory])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const url = `/api/supply?status=active${filterCategory !== 'all' ? `&category=${encodeURIComponent(filterCategory)}` : ''}`
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data.data || [])
    } catch (err) {
      console.error('Fetch products error:', err)
    } finally {
      setLoading(false)
    }
  }

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const body: Record<string, unknown> = { ...form }
      if (form.priceMin) body.priceMin = parseFloat(form.priceMin)
      if (form.priceMax) body.priceMax = parseFloat(form.priceMax)
      if (form.minQty) body.minQty = parseInt(form.minQty)
      if (form.leadTime) body.leadTime = parseInt(form.leadTime)

      const res = await fetch('/api/supply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '提交失败')
      setSuccess(data.id || data.product?.id || 'OK')
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
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{t('messages.submitSuccess')}</h2>
          <p className="text-slate-400 text-sm mb-8">{isZh ? '您的供给信息已进入全球池，AI 正在为您匹配买家' : 'Supply posted to global pool. AI is matching buyers for you.'}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setSuccess(null); setView('list') }} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all">
              {isZh ? '浏览所有供给' : 'Browse All Supply'}
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
                  placeholder={isZh ? '搜索产品、企业或关键词...' : 'Search products, companies...'} 
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
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{commonT('noData')}</h3>
                <p className="text-slate-500 text-sm mb-6">{isZh ? '换个关键词试试，或者发布您的第一条供给' : 'Try another filter or post your first supply.'}</p>
                <button onClick={() => setView('form')} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                  {isZh ? '发布我的供给' : 'Post My Supply'}
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
                        <input className={inputClass + ' pl-10'} placeholder="Company ID" value={form.enterpriseId} onChange={e => set('enterpriseId', e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t('fields.name')} *</label>
                      <input className={inputClass} placeholder="Product Name" value={form.name} onChange={e => set('name', e.target.value)} required />
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
                        <label className={labelClass}>{t('fields.origin')}</label>
                        <input className={inputClass} placeholder="Origin Country" value={form.origin} onChange={e => set('origin', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t('fields.description')}</label>
                      <textarea className={inputClass + ' resize-none'} rows={3} placeholder="Specs, quality, etc." value={form.description} onChange={e => set('description', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>{t('fields.priceMin')}</label>
                        <input type="number" className={inputClass} placeholder="Min" value={form.priceMin} onChange={e => set('priceMin', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.priceMax')}</label>
                        <input type="number" className={inputClass} placeholder="Max" value={form.priceMax} onChange={e => set('priceMax', e.target.value)} />
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
                        <label className={labelClass}>{t('fields.minQty')}</label>
                        <input type="number" className={inputClass} placeholder="100" value={form.minQty} onChange={e => set('minQty', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>{t('fields.leadTime')}</label>
                        <input type="number" className={inputClass} placeholder="Days" value={form.leadTime} onChange={e => set('leadTime', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-10 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> {t('submit')}</>}
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

function ProductCard({ product, locale }: { product: any; locale: string }) {
  const isZh = locale === 'zh-CN'
  return (
    <Link href={`/${locale}/enterprise/${product.enterpriseId}`} className="group block h-full">
      <div className="h-full flex flex-col bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Package className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">{isZh ? '原产地' : 'Origin'}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{product.origin || 'Global'}</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-black text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
            {product.category.split('/')[0].trim()}
          </span>
        </div>

        <p className="text-slate-500 text-xs line-clamp-2 mb-6 flex-1">
          {product.description || (isZh ? '暂无产品描述...' : 'No description available...')}
        </p>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{isZh ? '参考价格' : 'Ref Price'}</div>
              <div className="text-amber-500 font-black text-lg">
                {product.priceMin && product.priceMax 
                  ? `${product.currency} ${product.priceMin} - ${product.priceMax}`
                  : product.priceMin ? `${product.currency} ${product.priceMin}` : 'P.O.A'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{isZh ? '交期' : 'Lead Time'}</div>
              <div className="text-white font-bold text-sm">{product.leadTime ? `${product.leadTime} ${isZh ? '天' : 'Days'}` : 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
              <Building2 className="w-3 h-3 text-indigo-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 line-clamp-1">{product.enterprise?.name}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
