'use client'

import { use, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Globe, Tag, Phone, Mail, Link as LinkIcon, 
  Package, Target, CheckCircle2, Clock, MapPin, ShieldCheck,
  ChevronRight, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function EnterpriseDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = use(params)
  const t = useTranslations('OnboardingPage')
  const commonT = useTranslations('Common')
  const isZh = locale === 'zh-CN'

  const [enterprise, setEnterprise] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'supply' | 'demand'>('supply')

  useEffect(() => {
    fetchEnterprise()
  }, [id])

  const fetchEnterprise = async () => {
    try {
      const res = await fetch(`/api/enterprise/${id}`)
      const data = await res.json()
      setEnterprise(data.data)
    } catch (err) {
      console.error('Fetch enterprise error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
      <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
      <p className="text-slate-500">{commonT('loading')}</p>
    </div>
  )

  if (!enterprise) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-black text-white mb-4">{isZh ? '未找到企业信息' : 'Enterprise Not Found'}</h2>
      <Link href={`/${locale}`} className="text-amber-500 hover:underline">{isZh ? '返回首页' : 'Back to Home'}</Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Link href="javascript:history.back()" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {isZh ? '返回' : 'Back'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm sticky top-24">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/20 mb-6">
                <Building2 className="w-12 h-12 text-slate-900" />
              </div>
              <h1 className="text-2xl font-black text-white mb-2">{isZh ? enterprise.name : (enterprise.nameEn || enterprise.name)}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-500 uppercase">
                  {enterprise.status || 'Verified'}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase">
                  {enterprise.tradeDirection === 'both' ? (isZh ? '进出口' : 'Global Trade') : (isZh ? (enterprise.tradeDirection === 'export' ? '出口' : '进口') : enterprise.tradeDirection)}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <InfoItem icon={<Globe className="w-4 h-4" />} label={t('fields.country')} value={enterprise.country} />
              <InfoItem icon={<Tag className="w-4 h-4" />} label={t('fields.industry')} value={enterprise.industry} />
              <InfoItem icon={<MapPin className="w-4 h-4" />} label={t('fields.city')} value={enterprise.city} />
              <InfoItem icon={<LinkIcon className="w-4 h-4" />} label={t('fields.website')} value={enterprise.website} isLink />
              <InfoItem icon={<ShieldCheck className="w-4 h-4" />} label={t('fields.paymentPreference')} value={enterprise.paymentPreference} />
            </div>

            <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                {isZh ? '联系我们' : 'Contact Us'}
              </h3>
              <div className="space-y-3">
                <p className="text-xs text-slate-500 flex justify-between">
                  <span>{t('fields.contactName')}</span>
                  <span className="text-slate-300 font-medium">{enterprise.contactName || '***'}</span>
                </p>
                <p className="text-xs text-slate-500 flex justify-between">
                  <span>{t('fields.email')}</span>
                  <span className="text-slate-300 font-medium">
                    {enterprise.email ? (enterprise.email.replace(/(.{3}).*(@.*)/, '$1***$2')) : '***@***.com'}
                  </span>
                </p>
              </div>
              <button className="w-full mt-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-xs transition-all">
                {isZh ? '申请查看完整联系方式' : 'Request Full Contact'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Tabs & Lists */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-black text-white mb-4">{isZh ? '企业简介' : 'Company Profile'}</h2>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
              {enterprise.description || (isZh ? '该企业暂未填写简介...' : 'No company description available...')}
            </p>
          </div>

          <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
            <button
              onClick={() => setTab('supply')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                tab === 'supply' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              {isZh ? '在售产品' : 'Supply'}
            </button>
            <button
              onClick={() => setTab('demand')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                tab === 'demand' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              {isZh ? '采购需求' : 'Demands'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {tab === 'supply' ? (
                enterprise.products?.length > 0 ? (
                  enterprise.products.map((p: any) => <MiniCard key={p.id} type="supply" data={p} locale={locale} />)
                ) : (
                  <EmptyList message={isZh ? '暂无在售产品' : 'No products listed'} />
                )
              ) : (
                enterprise.demands?.length > 0 ? (
                  enterprise.demands.map((d: any) => <MiniCard key={d.id} type="demand" data={d} locale={locale} />)
                ) : (
                  <EmptyList message={isZh ? '暂无采购需求' : 'No demands listed'} />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value, isLink }: { icon: any; label: string; value: string; isLink?: boolean }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between text-xs py-1">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span>{label}</span>
      </div>
      {isLink ? (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" className="text-amber-500 font-medium truncate max-w-[120px]">{value.replace(/^https?:\/\//, '')}</a>
      ) : (
        <span className="text-slate-300 font-medium text-right">{value}</span>
      )}
    </div>
  )
}

function MiniCard({ type, data, locale }: { type: 'supply' | 'demand'; data: any; locale: string }) {
  const isZh = locale === 'zh-CN'
  return (
    <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 transition-all">
      <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{type === 'supply' ? data.name : data.title}</h4>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] text-slate-500 font-bold uppercase">{data.category.split('/')[0].trim()}</span>
        <span className="text-amber-500 font-black text-xs">
          {type === 'supply' 
            ? (data.priceMin ? `${data.currency} ${data.priceMin}` : 'P.O.A')
            : (data.budgetMin ? `${data.currency} ${data.budgetMin}` : 'ANY')
          }
        </span>
      </div>
    </div>
  )
}

function EmptyList({ message }: { message: string }) {
  return (
    <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
      <p className="text-slate-600 text-sm">{message}</p>
    </div>
  )
}

function Loader2(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
