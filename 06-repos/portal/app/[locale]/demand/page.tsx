'use client'

import { use, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, ChevronRight, Check, Loader2, ArrowLeft,
  DollarSign, Tag, MapPin, ShoppingCart, FileText, Building2, Boxes
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

const PAYMENT_OPTIONS = [
  { value: 'TT', label: 'T/T 电汇', desc: '银行电汇转账', icon: '🏦' },
  { value: 'LC', label: 'L/C 信用证', desc: '跟单信用证', icon: '📄' },
  { value: 'DP', label: 'D/P 付款交单', desc: '付款后交单', icon: '🤝' },
  { value: 'OA', label: 'O/A 赊账', desc: '先货后款', icon: '📋' },
]

const inputClass = `w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white
  placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:bg-slate-800
  transition-all text-sm`
const labelClass = `block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2`

export default function DemandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  const [form, setForm] = useState({
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
      setSuccess(data.id || data.demand?.id || 'DM-' + Date.now().toString(36).toUpperCase())
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
            className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(139,92,246,0.4)]"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-3">需求发布成功</h2>
          <p className="text-slate-400 mb-2">您的采购需求已提交，AI 引擎正在匹配全球供应方</p>
          <p className="text-xs text-slate-600 font-mono mb-10">需求编号 · {success}</p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/${locale}/demand`}
              onClick={() => setSuccess(null)}
              className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors text-center"
            >
              继续发布需求
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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-slate-800/60 backdrop-blur-xl bg-slate-950/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href={`/${locale}`} className="p-2 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-lg leading-none">发布需求</h1>
              <p className="text-xs text-slate-500 mt-0.5">IBC · 全球智能贸易平台</p>
            </div>
          </div>
          <Link href={`/${locale}/supply`} className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
            发布供给 <ChevronRight className="w-3 h-3" />
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
              发布您的采购需求至 IBC 全球供给池，AI 引擎将自动匹配全球供应商，并通过智能合约完成撮合。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: 采购信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="font-bold text-white">采购信息</h2>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className={labelClass}>需求标题 <span className="text-red-400">*</span></label>
                  <input
                    className={inputClass}
                    placeholder="如：求购优质铁矿石 62% Fe，5万吨/月..."
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
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
                  <label className={labelClass}>需求描述</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <textarea
                      className={inputClass + ' pl-10 resize-none'}
                      placeholder="详细描述采购规格、品质要求、认证要求等..."
                      rows={3}
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: 预算参数 */}
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
                <h2 className="font-bold text-white">预算参数</h2>
              </div>

              <div className="space-y-4">
                {/* Budget range + Currency */}
                <div>
                  <label className={labelClass}>预算区间</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">最低</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={inputClass + ' pt-7 pb-2 text-right'}
                        placeholder="0.00"
                        value={form.budgetMin}
                        onChange={e => set('budgetMin', e.target.value)}
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
                        value={form.budgetMax}
                        onChange={e => set('budgetMax', e.target.value)}
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

                {/* Quantity + Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>采购数量</label>
                    <div className="relative">
                      <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="number"
                        min="1"
                        className={inputClass + ' pl-10'}
                        placeholder="1000"
                        value={form.quantity}
                        onChange={e => set('quantity', e.target.value)}
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
              </div>
            </motion.div>

            {/* Section 3: 交付要求 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="font-bold text-white">交付要求</h2>
              </div>

              <div className="space-y-5">
                {/* Delivery Location */}
                <div>
                  <label className={labelClass}>交货地点</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      className={inputClass + ' pl-10'}
                      placeholder="如：上海港 / Shanghai Port"
                      value={form.deliveryLocation}
                      onChange={e => set('deliveryLocation', e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Preference */}
                <div>
                  <label className={labelClass}>付款方式偏好</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set('paymentPreference', form.paymentPreference === opt.value ? '' : opt.value)}
                        className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                          form.paymentPreference === opt.value
                            ? 'border-violet-500/60 bg-violet-500/10'
                            : 'border-slate-700/60 bg-slate-800/40 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-xl leading-none mt-0.5">{opt.icon}</span>
                        <div>
                          <div className={`text-sm font-bold ${form.paymentPreference === opt.value ? 'text-violet-300' : 'text-white'}`}>
                            {opt.label}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                        </div>
                        {form.paymentPreference === opt.value && (
                          <Check className="w-4 h-4 text-violet-400 ml-auto shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accept Alternative Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl">
                  <div>
                    <div className="text-sm font-semibold text-white">接受替代方案</div>
                    <div className="text-xs text-slate-500 mt-0.5">允许 AI 推荐同类替代产品或供应商</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => set('acceptAlternative', !form.acceptAlternative)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      form.acceptAlternative ? 'bg-violet-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        form.acceptAlternative ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
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
              className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center gap-3"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI 正在处理...
                </>
              ) : (
                <>
                  提交采购需求
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
            { label: '供给', href: `/${locale}/supply`, icon: '📦' },
            { label: '需求', href: `/${locale}/demand`, icon: '🎯', active: true },
            { label: '机会', href: `/${locale}/opportunities`, icon: '🔍' },
          ].map(item => (
            <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-1 ${'active' in item && item.active ? 'text-violet-400' : 'text-slate-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
