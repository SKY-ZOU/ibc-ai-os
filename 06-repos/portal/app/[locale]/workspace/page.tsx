import { prisma } from '../../../lib/prisma'
import WorkspaceBoard from './_components/workspace-board'

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  const opps = await prisma.opportunity.findMany({
    where: { NOT: { enterpriseId: 'system' } },
    include: { enterprise: { select: { id: true, name: true, country: true } } },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  const serialized = opps.map(o => ({
    id: o.id,
    title: o.title,
    stage: o.stage,
    value: o.value,
    currency: o.currency,
    probability: o.probability,
    createdAt: o.createdAt.toISOString(),
    enterprise: o.enterprise,
  }))

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`/${locale}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isZh ? '首页' : 'Home'}
            </a>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-black text-[10px]">IBC</span>
              </div>
              <span className="text-white font-semibold text-sm">{isZh ? '撮合工作台' : 'Deal Workspace'}</span>
            </div>
          </div>
          <a href={`/${locale}/opportunities`}
            className="px-4 py-2 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-sm rounded-lg transition-colors">
            {isZh ? '商机池' : 'Opportunities'}
          </a>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 pt-8 pb-4">
        <WorkspaceBoard initialOpps={serialized} isZh={isZh} locale={locale} />
      </div>
    </div>
  )
}
