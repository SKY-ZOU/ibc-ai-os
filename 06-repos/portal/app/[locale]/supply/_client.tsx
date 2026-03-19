'use client'

export const dynamic = 'force-dynamic'

import { use, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, ChevronRight, Check, Loader2, ArrowLeft,
  DollarSign, Tag, Globe, Hash, Boxes, Clock, FileText, Building2
} from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  '农产品 / Agriculture', '矿产资源 / Minerals', '能源 / Energy',
  '化工品 / Chemicals', '钢铁金属 / Steel & Metals', '纺织品 / Textiles',
  '电子产品 / Electronics', '机械设备 / Machinery', '建材 / Building Materials',
  '消费品 / Consumer Goods', '医疗健康 / Healthcare', '其他 / Others'
]

const CURRENCIES = ['USD', 'CNY', 'EUR', 'HKD', 'GBP', 'JPY']
const UNITS = ['吨 MT', '千克 KG', '件 PCS', '套 SET', '箱 CTN', '立方米 CBM', '升 L', '平方米 SQM']

const inputClass = `w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white
  placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:bg-slate-800
  transition-all text-sm`
const labelClass = `block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2`

export default function SupplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

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
      <main className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(16,185,129,0.4)]"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-3">供给发布成功</h2>
          <p className="text-slate-400 mb-2">您的供给信息已提交，AI 引擎正在匹配采购方</p>
          <p className="text-xs text-slate-600 font-mono mb-10">供给编号 · {success}</p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/${locale}/supply`}
              onClick={() => setSuccess(null)}
              className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors text-center"
            >
              继续发布供给
            </Link>
            <Link
              href={`/${locale}/opportunities`}
              className="block w-full py-4 border border-slate-700 text-slate-300 font-bold rounded-2xl hover:bg-slate-800/50 transition-colors text-center"
            >
              查看匹配机会
            </Link>
            <Link
              href={`/${locale}`}
              className="block w-full py-4 text-slate-500 font-semibold transition-colors text-center hover:text-slate-300"
            >
              返回首页
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-slate-800/60 backdrop-blur-xl bg-slate-950/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href={`/${locale}`} className="p-2 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-lg leading-none">发布供给</h1>
              <p className="text-xs text-slate-500 mt-0.5">IBC · 全球智能贸易平台</p>
            </div>
          </div>
          <Link href={`/${locale}/demand`} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
            发布需求 <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Intro */}
          <div className="mb-8">
            <p className="text-slate-400 text-sm leading-relaxed">
              将您的产品或资源提交至 IBC 全球供给池，AI 引擎将自动匹配全球采购方，并通过智能合约完成撮合。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Package className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="font-bold text-white">产品信息</h2>
              </div>

              <div className="space-y-4">
                {/* Enterprise ID */}
                <div>
                  <label className={labelClass}>企业 ID <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      className={inputClass + ' pl-10'}
                      placeholder="您的企业注册ID（入驻时获取）"
                      value={form.enterpriseId}
                      onChange={e => set('enterpriseId', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className={labelClass}>产品名称 <span className="text-red-400">*</span></label>
                  <input
                    className={inputClass}
                    placeholder="如：优质精炼铜、有机大豆、工业级甲醇..."
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className={labelClass}>产品分类 <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    <select
                      className={inputClass + ' pl-10 appearance-none cursor-pointer'}
                      value={form.category}
                      onChange={e => set('category', e.target.value)}
                      required
                    >
                      <option value="" disabled>选择分类</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>产品描述</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <textarea
                      className={inputClass + ' pl-10 resize-none'}
                      placeholder="详细描述产品规格、品质标准、包装方式等..."
                      rows={3}
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Trade Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="font-bold text-white">贸易参数</h2>
              </div>

              <div className="space-y-4">
                {/* Price range + Currency */}
                <div>
                  <label className={labelClass}>价格区间</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">最低</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={inputClass + ' pt-7 pb-2 text-right'}
                        placeholder="0.00"
                        value={form.priceMin}
                        onChange={e => set('priceMin', e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">最高</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={inputClass + ' pt-7 pb-2 text-right'}
                        placeholder="0.00"
                        value={form.priceMax}
                        onChange={e => set('priceMax', e.target.value)}
                      />
                    </div>
                    <select
                      className={inputClass + ' appearance-none cursor-pointer'}
                      value={form.currency}
                      onChange={e => set('currency', e.target.value)}
                    >
                      {CURRENCIES.map(c => (
                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Qty + Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>最小起订量</label>
                    <div className="relative">
                      <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="number"
                        min="1"
                        className={inputClass + ' pl-10'}
                        placeholder="100"
                        value={form.minQty}
                        onChange={e => set('minQty', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>计量单位</label>
                    <select
                      className={inputClass + ' appearance-none cursor-pointer'}
                      value={form.unit}
                      onChange={e => set('unit', e.target.value)}
                    >
                      <option value="" className="bg-slate-900">选择单位</option>
                      {UNITS.map(u => (
                        <option key={u} value={u} className="bg-slate-900">{u}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lead Time */}
                <div>
                  <label className={labelClass}>交期（天）</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      min="1"
                      className={inputClass + ' pl-10'}
                      placeholder="如：30（表示30天内可交货）"
                      value={form.leadTime}
                      onChange={e => set('leadTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="font-bold text-white">合规信息</h2>
                <span className="text-xs text-slate-600 ml-auto">选填，有助于 AI 精准匹配</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>HS 编码</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        className={inputClass + ' pl-10 font-mono'}
                        placeholder="如：7403.11"
                        value={form.hsCode}
                        onChange={e => set('hsCode', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>原产地</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        className={inputClass + ' pl-10'}
                        placeholder="如：中国 / China"
                        value={form.origin}
                        onChange={e => set('origin', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI 正在处理...
                </>
              ) : (
                <>
                  提交供给信息
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-slate-600">
              提交即代表您同意 IBC 平台
              <a href="#" className="text-indigo-500 hover:underline mx-1">服务协议</a>
              及
              <a href="#" className="text-indigo-500 hover:underline mx-1">隐私政策</a>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/60 px-4 py-3 md:hidden">
        <div className="flex justify-around max-w-sm mx-auto">
          {[
            { label: '首页', href: `/${locale}`, icon: '🏠' },
            { label: '供给', href: `/${locale}/supply`, icon: '📦', active: true },
            { label: '需求', href: `/${locale}/demand`, icon: '🎯' },
            { label: '机会', href: `/${locale}/opportunities`, icon: '🔍' },
          ].map(item => (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 ${item.active ? 'text-emerald-400' : 'text-slate-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
