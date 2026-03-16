import { notFound } from 'next/navigation'
import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'
import EnterpriseTabs from './_components/enterprise-tabs'

const STATUS_BADGE: Record<string, { label: string; labelEn: string; cls: string }> = {
  pending:  { label: '审核中', labelEn: 'Pending',  cls: 'text-amber-400 bg-amber-900/30 border-amber-700/40' },
  active:   { label: '已认证', labelEn: 'Active',   cls: 'text-emerald-400 bg-emerald-900/30 border-emerald-700/40' },
  rejected: { label: '已拒绝', labelEn: 'Rejected', cls: 'text-rose-400 bg-rose-900/30 border-rose-700/40' },
}

const TRADE_DIR: Record<string, { zh: string; en: string }> = {
  export: { zh: '📤 出口供给', en: '📤 Export' },
  import: { zh: '📥 进口采购', en: '📥 Import' },
  both:   { zh: '🔄 双向贸易', en: '🔄 Both' },
}

export default async function EnterprisePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const isZh = locale === 'zh-CN'

  const ent = await prisma.enterprise.findUnique({
    where: { id },
    include: {
      products:      { orderBy: { createdAt: 'desc' } },
      demands:       { orderBy: { createdAt: 'desc' } },
      opportunities: { where: { NOT: { enterpriseId: 'system' } }, orderBy: { createdAt: 'desc' } },
    },
  })

  if (!ent || ent.id === 'system') notFound()

  const badge = STATUS_BADGE[ent.status] ?? STATUS_BADGE.pending
  const tradeDir = ent.tradeDirection ? TRADE_DIR[ent.tradeDirection] : null

  const serialize = <T extends { createdAt: Date }>(arr: T[]) =>
    arr.map(r => ({ ...r, createdAt: r.createdAt.toISOString() }))

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* BG glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-900/15 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#020617]/80 backdrop-blur sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isZh ? '首页' : 'Home'}
          </a>
          <div className="flex gap-2">
            <a href={`/${locale}/supply`} className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors">
              {isZh ? '+ 发布供给' : '+ Post Supply'}
            </a>
            <a href={`/${locale}/demand`} className="px-3 py-1.5 text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
              {isZh ? '+ 发布需求' : '+ Post Demand'}
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Hero card */}
        <div className="rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 font-black text-xl">{ent.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl font-black text-white">{ent.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${badge.cls}`}>
                  {isZh ? badge.label : badge.labelEn}
                </span>
              </div>
              {ent.nameEn && <p className="text-slate-400 text-sm mb-2">{ent.nameEn}</p>}
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span>📍 {ent.city ? `${ent.city}, ` : ''}{ent.country}</span>
                {ent.industry && <span>🏭 {ent.industry}</span>}
                {tradeDir && <span>{isZh ? tradeDir.zh : tradeDir.en}</span>}
                {ent.paymentPreference && <span>💳 {ent.paymentPreference.toUpperCase()}</span>}
              </div>
            </div>
          </div>

          {ent.description && (
            <p className="mt-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{ent.description}</p>
          )}

          {/* Contact */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            {ent.contactName && <span>👤 {ent.contactName}</span>}
            {ent.email && <a href={`mailto:${ent.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{ent.email}</a>}
            {ent.phone && <span>📞 {ent.phone}</span>}
            {ent.website && <a href={ent.website} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">{ent.website}</a>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: isZh ? '供给产品' : 'Products', value: ent.products.length, color: 'text-emerald-400' },
            { label: isZh ? '采购需求' : 'Demands',  value: ent.demands.length,  color: 'text-violet-400' },
            { label: isZh ? '撮合商机' : 'Deals',    value: ent.opportunities.length, color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <EnterpriseTabs
          products={serialize(ent.products) as Parameters<typeof EnterpriseTabs>[0]['products']}
          demands={serialize(ent.demands) as Parameters<typeof EnterpriseTabs>[0]['demands']}
          opportunities={serialize(ent.opportunities) as Parameters<typeof EnterpriseTabs>[0]['opportunities']}
          isZh={isZh}
          locale={locale}
        />

        {/* Enterprise ID */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs">Enterprise ID: <span className="font-mono text-slate-500">{ent.id}</span></p>
        </div>
      </div>
    </div>
  )
}
