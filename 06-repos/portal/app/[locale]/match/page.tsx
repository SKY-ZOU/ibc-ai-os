export const dynamic = 'force-dynamic'

import MatchClient from './_components/match-client'

export default async function MatchPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={`/${locale}`}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
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
              <span className="text-white font-semibold text-sm">
                {isZh ? 'AI 商机匹配' : 'AI Match Engine'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/${locale}/opportunities`}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-sm rounded-lg transition-colors"
            >
              {isZh ? '商机池' : 'Opportunity Pool'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={`/${locale}/workspace`}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-sm rounded-lg transition-colors"
            >
              {isZh ? '撮合工作台' : 'Workspace'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={`/${locale}/supply`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold text-sm rounded-lg transition-colors"
            >
              {isZh ? '+ 发布供给' : '+ Post Supply'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-[#0f172a] border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              {isZh ? 'AI 商机匹配引擎' : 'AI Match Engine'}
            </h1>
          </div>
          <p className="text-slate-400 text-base mb-6">
            {isZh
              ? '基于 AI 算法，从全球供需池中精准匹配最优贸易机会，匹配度 0-100 可视化'
              : 'AI-powered matching from the global supply-demand pool — match scores visualized 0-100'}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              {
                label: isZh ? '匹配算法' : 'Match Algorithm',
                value: 'AI',
                color: 'text-amber-400',
              },
              {
                label: isZh ? '覆盖国家' : 'Countries',
                value: '50+',
                color: 'text-emerald-400',
              },
              {
                label: isZh ? '高匹配阈值' : 'High Match',
                value: '≥90',
                color: 'text-blue-400',
              },
              {
                label: isZh ? '实时计算' : 'Real-time',
                value: isZh ? '✓' : '✓',
                color: 'text-violet-400',
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
              >
                <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
                <span className="text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Score legend */}
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            {[
              { range: '90-100', label: isZh ? '极高匹配' : 'Excellent', color: 'bg-emerald-500' },
              { range: '75-89', label: isZh ? '高度匹配' : 'High', color: 'bg-amber-500' },
              { range: '60-74', label: isZh ? '中等匹配' : 'Medium', color: 'bg-blue-500' },
              { range: '0-59', label: isZh ? '一般匹配' : 'Low', color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.range} className="flex items-center gap-1.5 text-slate-400">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span>{item.range}</span>
                <span className="text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <MatchClient locale={locale} isZh={isZh} />
      </main>
    </div>
  )
}
