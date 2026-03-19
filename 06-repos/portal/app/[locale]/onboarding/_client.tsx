'use client'

export const dynamic = 'force-dynamic'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string; nameEn: string; country: string; city: string; industry: string; website: string
  contactName: string; email: string; phone: string; description: string
  tradeDirection: string; paymentPreference: string; commodities: string
}

const INDUSTRIES = ['能源化工','矿产资源','农业大宗','纺织轻工','机械设备','电子元器件','建材钢铁','医药健康','金融服务','其他']
const COUNTRIES = ['中国','美国','英国','德国','法国','澳大利亚','迪拜/UAE','沙特阿拉伯','印度','新加坡','印度尼西亚','泰国','越南','巴西','南非','尼日利亚','俄罗斯','智利','其他']
const TRADE_DIRS = [
  { value: 'export', zh: '出口供给', en: 'Export / Supply', desc_zh: '我有货物/资源，寻找全球买家', desc_en: 'I have goods or resources, seeking global buyers', icon: '📤' },
  { value: 'import', zh: '进口采购', en: 'Import / Procurement', desc_zh: '我有需求，寻找全球供应商', desc_en: 'I have demand, seeking global suppliers', icon: '📥' },
  { value: 'both',   zh: '双向贸易', en: 'Both Directions', desc_zh: '同时有供给和采购需求', desc_en: 'Both supply and procurement needs', icon: '🔄' },
]
const PAYMENTS = [
  { value: 'rmb',        zh: '人民币结算',           en: 'RMB Settlement',      icon: '¥' },
  { value: 'stablecoin', zh: '稳定币 (USDT/USDC)',   en: 'Stablecoin',          icon: '₮' },
  { value: 'usd',        zh: '美元 (USD)',            en: 'USD',                 icon: '$' },
  { value: 'mixed',      zh: '多种方式均可',           en: 'Flexible',            icon: '⚡' },
]
const STEPS = [
  { n: 1, zh: '企业信息', en: 'Company',  icon: '🏢' },
  { n: 2, zh: '联系方式', en: 'Contact',  icon: '👤' },
  { n: 3, zh: '贸易偏好', en: 'Trade',    icon: '🌐' },
]

export default function OnboardingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const isZh = locale === 'zh-CN'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [enterpriseId, setEnterpriseId] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    name: '', nameEn: '', country: '', city: '', industry: '', website: '',
    contactName: '', email: '', phone: '', description: '',
    tradeDirection: '', paymentPreference: '', commodities: '',
  })

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.country
    if (step === 2) return form.contactName.trim() && form.email.trim()
    return form.tradeDirection && form.paymentPreference
  }

  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) { setEnterpriseId(data.data.id); setDone(true) }
      else setError(data.error || (isZh ? '提交失败，请重试' : 'Submission failed, please retry'))
    } catch { setError(isZh ? '网络错误，请重试' : 'Network error, please retry') }
    finally { setLoading(false) }
  }

  // ── Success ──────────────────────────────────────────────────
  if (done) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-3">
          {isZh ? '入驻申请已提交！' : 'Application Submitted!'}
        </h1>
        <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-4">
          <span className="text-slate-400 text-xs">{isZh ? 'Enterprise ID' : 'Enterprise ID'}：</span>
          <span className="text-amber-400 font-mono text-sm font-bold">{enterpriseId}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {isZh
            ? 'AI 正在生成您的企业画像，预计 24 小时内完成审核，审核结果将发送至您的邮箱。'
            : 'AI is building your enterprise profile. Expect review within 24h — results will be sent to your email.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`/${locale}/supply`}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-colors text-sm">
            {isZh ? '📤 发布供给' : '📤 Post Supply'}
          </a>
          <a href={`/${locale}/demand`}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors text-sm">
            {isZh ? '📥 发布需求' : '📥 Post Demand'}
          </a>
          <a href={`/${locale}`}
            className="px-6 py-3 border border-white/10 text-white hover:bg-white/5 font-semibold rounded-xl transition-colors text-sm">
            {isZh ? '返回首页' : 'Home'}
          </a>
        </div>
      </motion.div>
    </div>
  )

  // ── Main form ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* BG glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-900/15 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#020617]/80 backdrop-blur sticky top-0">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-slate-900 font-black text-sm">IBC</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-none">IBC AI Trade OS</div>
              <div className="text-amber-400/60 text-[10px] tracking-widest uppercase">ibcbarter.com</div>
            </div>
          </a>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            {isZh ? '免费入驻，立即开始' : 'Free · No credit card required'}
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-xl mx-auto px-4 py-10 pb-32 sm:pb-10">

        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {isZh ? '企业入驻申请' : 'Enterprise Onboarding'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isZh ? '3 步完成入驻，AI 自动生成企业画像，即刻触达全球 58 国商机' : '3 steps to join — AI builds your profile, instantly reaching opportunities across 58 countries'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <button onClick={() => step > s.n && setStep(s.n)}
                className={`flex items-center gap-2 flex-shrink-0 ${step > s.n ? 'cursor-pointer' : 'cursor-default'}`}>
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step > s.n  ? 'bg-emerald-500 border-emerald-500 text-white' :
                  step === s.n ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30 scale-110' :
                                 'bg-white/5 border-white/10 text-slate-600'
                }`}>
                  {step > s.n ? '✓' : s.icon}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${step === s.n ? 'text-white' : 'text-slate-600'}`}>
                  {isZh ? s.zh : s.en}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-all duration-500 ${step > s.n ? 'bg-emerald-500/60' : 'bg-white/8'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur overflow-hidden shadow-2xl shadow-black/40">
          {/* Card header */}
          <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{STEPS[step-1].icon}</span>
              <div>
                <h2 className="text-base font-black text-white">
                  {step === 1 && (isZh ? '企业基本信息' : 'Company Information')}
                  {step === 2 && (isZh ? '联系方式' : 'Contact Details')}
                  {step === 3 && (isZh ? '贸易偏好' : 'Trade Preferences')}
                </h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  {step === 1 && (isZh ? '帮助 AI 建立您的企业画像' : 'Help AI build your enterprise profile')}
                  {step === 2 && (isZh ? '用于商机推送和审核通知' : 'For opportunity alerts and review notifications')}
                  {step === 3 && (isZh ? '精准匹配全球贸易伙伴' : 'For precise global partner matching')}
                </p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
              className="p-6 space-y-4">

              {step === 1 && <>
                <Field label={isZh ? '企业名称 *' : 'Company Name *'}>
                  <Input value={form.name} onChange={v => set('name', v)}
                    placeholder={isZh ? '天汇贸易有限公司' : 'Acme Trading Ltd.'} />
                </Field>
                <Field label={isZh ? '英文名称' : 'English Name'}>
                  <Input value={form.nameEn} onChange={v => set('nameEn', v)}
                    placeholder="Tianhui Trading Co., Ltd." />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label={isZh ? '国家/地区 *' : 'Country *'}>
                    <Select value={form.country} onChange={v => set('country', v)}
                      options={COUNTRIES} placeholder={isZh ? '请选择' : 'Select'} />
                  </Field>
                  <Field label={isZh ? '城市' : 'City'}>
                    <Input value={form.city} onChange={v => set('city', v)}
                      placeholder={isZh ? '香港' : 'Hong Kong'} />
                  </Field>
                </div>
                <Field label={isZh ? '所属行业' : 'Industry'}>
                  <Select value={form.industry} onChange={v => set('industry', v)}
                    options={INDUSTRIES} placeholder={isZh ? '请选择行业' : 'Select industry'} />
                </Field>
                <Field label={isZh ? '企业官网' : 'Website'}>
                  <Input value={form.website} onChange={v => set('website', v)}
                    placeholder="https://example.com" />
                </Field>
              </>}

              {step === 2 && <>
                <Field label={isZh ? '联系人姓名 *' : 'Contact Name *'}>
                  <Input value={form.contactName} onChange={v => set('contactName', v)}
                    placeholder={isZh ? '张三' : 'John Smith'} />
                </Field>
                <Field label={isZh ? '邮箱地址 *' : 'Email *'}>
                  <Input value={form.email} onChange={v => set('email', v)} type="email"
                    placeholder="contact@company.com" />
                </Field>
                <Field label={isZh ? '手机 / WhatsApp' : 'Phone / WhatsApp'}>
                  <Input value={form.phone} onChange={v => set('phone', v)}
                    placeholder="+86 138 0000 0000" />
                </Field>
                <Field label={isZh ? '企业简介' : 'Company Description'}>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)}
                    rows={3} placeholder={isZh
                      ? '简要介绍企业主营业务、产品或资源优势...'
                      : 'Brief description of main business, products, or resource advantages...'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-all resize-none" />
                </Field>
              </>}

              {step === 3 && <>
                <Field label={isZh ? '贸易方向 *' : 'Trade Direction *'}>
                  <div className="space-y-2">
                    {TRADE_DIRS.map(t => (
                      <button key={t.value} onClick={() => set('tradeDirection', t.value)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all ${
                          form.tradeDirection === t.value
                            ? 'border-indigo-500/60 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                            : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
                        }`}>
                        <span className="text-xl flex-shrink-0">{t.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm ${form.tradeDirection === t.value ? 'text-indigo-300' : 'text-white'}`}>
                            {isZh ? t.zh : t.en}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5 truncate">
                            {isZh ? t.desc_zh : t.desc_en}
                          </div>
                        </div>
                        {form.tradeDirection === t.value && (
                          <span className="text-indigo-400 text-sm flex-shrink-0">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={isZh ? '结算方式偏好 *' : 'Payment Preference *'}>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENTS.map(p => (
                      <button key={p.value} onClick={() => set('paymentPreference', p.value)}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all ${
                          form.paymentPreference === p.value
                            ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                            : 'border-white/8 bg-white/3 hover:border-white/15'
                        }`}>
                        <span className={`text-base font-black w-5 text-center flex-shrink-0 ${
                          form.paymentPreference === p.value ? 'text-amber-400' : 'text-slate-500'
                        }`}>{p.icon}</span>
                        <span className={`text-xs font-semibold leading-tight ${
                          form.paymentPreference === p.value ? 'text-amber-300' : 'text-slate-300'
                        }`}>{isZh ? p.zh : p.en}</span>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label={isZh ? '主要商品 / 品类' : 'Main Commodities'}>
                  <Input value={form.commodities} onChange={v => set('commodities', v)}
                    placeholder={isZh ? '如：铁矿石、大豆、机械设备...' : 'e.g. Iron ore, soybeans, machinery...'} />
                </Field>

                {error && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 px-4 py-3 text-rose-400 text-sm">
                    {error}
                  </div>
                )}
              </>}
            </motion.div>
          </AnimatePresence>

          {/* Footer buttons */}
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="px-5 py-2.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 rounded-xl text-sm font-semibold transition-all">
                ← {isZh ? '上一步' : 'Back'}
              </button>
            ) : (
              <a href={`/${locale}`} className="text-slate-600 hover:text-slate-400 text-sm transition-colors">
                {isZh ? '取消' : 'Cancel'}
              </a>
            )}

            <div className="flex items-center gap-3">
              {/* Progress dots */}
              <div className="flex gap-1">
                {[1,2,3].map(n => (
                  <div key={n} className={`rounded-full transition-all duration-300 ${
                    n === step ? 'w-4 h-1.5 bg-indigo-400' : n < step ? 'w-1.5 h-1.5 bg-emerald-500' : 'w-1.5 h-1.5 bg-white/10'
                  }`} />
                ))}
              </div>

              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                  className={`px-7 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    canNext()
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed'
                  }`}>
                  {isZh ? '下一步' : 'Next'} →
                </button>
              ) : (
                <button onClick={submit} disabled={!canNext() || loading}
                  className={`px-7 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    canNext() && !loading
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed'
                  }`}>
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-slate-600 border-t-slate-900 rounded-full animate-spin" />{isZh ? '提交中...' : 'Submitting...'}</>
                    : <>{isZh ? '🚀 提交申请' : '🚀 Submit'}</>
                  }
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust line */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
          {[
            isZh ? '🔒 数据加密传输' : '🔒 Encrypted',
            isZh ? '✅ 免费入驻'    : '✅ Free',
            isZh ? '⚡ 24h 审核'   : '⚡ 24h Review',
            isZh ? '🌐 覆盖 58 国'  : '🌐 58 Countries',
          ].map(b => <span key={b}>{b}</span>)}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur border-t border-slate-700/60">
        <div className="flex items-center justify-around py-3">
          <a href={`/${locale}`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px]">{isZh ? '首页' : 'Home'}</span>
          </a>
          <a href={`/${locale}/supply`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <span className="text-[10px]">{isZh ? '供给' : 'Supply'}</span>
          </a>
          <a href={`/${locale}/onboarding`} className="flex flex-col items-center gap-1 text-amber-400">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center -mt-4 shadow-lg shadow-amber-500/30">
              <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <span className="text-[10px]">{isZh ? '入驻' : 'Join'}</span>
          </a>
          <a href={`/${locale}/demand`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <span className="text-[10px]">{isZh ? '需求' : 'Demand'}</span>
          </a>
          <a href={`/${locale}/opportunities`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span className="text-[10px]">{isZh ? '商机' : 'Opps'}</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, type = 'text', placeholder }: {
  value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all" />
  )
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/60 transition-all appearance-none cursor-pointer"
      style={{ color: value ? 'white' : 'rgb(75 85 99)' }}>
      <option value="" disabled style={{ color: 'rgb(75 85 99)' }}>{placeholder}</option>
      {options.map(o => <option key={o} value={o} style={{ color: 'white', background: '#1e293b' }}>{o}</option>)}
    </select>
  )
}
