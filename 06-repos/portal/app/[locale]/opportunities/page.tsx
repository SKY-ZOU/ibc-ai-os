import { getMockOpportunities } from '../../lib/mock-opportunities'
import OppList from './_components/opp-list'

export default async function OpportunitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'
  const opps = getMockOpportunities()
  const supplyCount = opps.filter((o) => o.type === 'supply').length
  const demandCount = opps.filter((o) => o.type === 'demand').length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`/${locale}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isZh ? '返回首页' : 'Home'}
            </a>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">IBC</span>
              </div>
              <span className="text-white font-semibold text-sm">{isZh ? '商机池' : 'Opportunity Pool'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/${locale}/workspace`}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-sm rounded-lg transition-colors">
              {isZh ? '撮合工作台' : 'Workspace'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a href={`/${locale}/supply`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold text-sm rounded-lg transition-colors">
              {isZh ? '+ 发布供给' : '+ Post Supply'}
            </a>
            <a href={`/${locale}/demand`}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg transition-colors border border-white/10">
              {isZh ? '+ 发布需求' : '+ Post Demand'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-[#0f172a] border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {isZh ? '🌐 全球商机池' : '🌐 Global Opportunity Pool'}
          </h1>
          <p className="text-slate-400 text-base mb-6">
            {isZh
              ? 'AI 实时匹配全球供需，发现最适合你的跨境贸易机会'
              : 'AI matches global supply and demand in real-time — find the best cross-border opportunities'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: isZh ? '全部商机' : 'Total', value: opps.length, color: 'text-white' },
              { label: isZh ? '供给方' : 'Supply', value: supplyCount, color: 'text-emerald-400' },
              { label: isZh ? '需求方' : 'Demand', value: demandCount, color: 'text-blue-400' },
              { label: isZh ? 'AI高匹配（≥90）' : 'AI High Match', value: opps.filter((o) => o.aiScore >= 90).length, color: 'text-amber-400' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
                <span className="text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <OppList opps={opps} locale={locale} isZh={isZh} />
      </main>
    </div>
  )
}
