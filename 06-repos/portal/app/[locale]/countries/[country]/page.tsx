import { notFound } from 'next/navigation'
import { prisma } from '../../../../lib/prisma'

const FLAGS: Record<string, string> = {
  '中国': '🇨🇳', '美国': '🇺🇸', '英国': '🇬🇧', '德国': '🇩🇪', '法国': '🇫🇷',
  '澳大利亚': '🇦🇺', '迪拜/UAE': '🇦🇪', '沙特阿拉伯': '🇸🇦', '印度': '🇮🇳',
  '新加坡': '🇸🇬', '印度尼西亚': '🇮🇩', '泰国': '🇹🇭', '越南': '🇻🇳',
  '巴西': '🇧🇷', '南非': '🇿🇦', '尼日利亚': '🇳🇬', '俄罗斯': '🇷🇺',
  '智利': '🇨🇱', 'Global': '🌐', '其他': '🌍',
}

const TRADE_DIR: Record<string, { zh: string; en: string; color: string }> = {
  export: { zh: '📤 出口供给', en: '📤 Export',  color: 'text-emerald-400 bg-emerald-900/20 border-emerald-800/30' },
  import: { zh: '📥 进口采购', en: '📥 Import',  color: 'text-violet-400 bg-violet-900/20 border-violet-800/30' },
  both:   { zh: '🔄 双向贸易', en: '🔄 Both',    color: 'text-amber-400 bg-amber-900/20 border-amber-800/30' },
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>
}) {
  const { locale, country: rawCountry } = await params
  const country = decodeURIComponent(rawCountry)
  const isZh = locale === 'zh-CN'

  const enterprises = await prisma.enterprise.findMany({
    where: { country, NOT: { id: 'system' } },
    include: {
      _count: { select: { products: true, demands: true, opportunities: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (enterprises.length === 0) notFound()

  const flag = FLAGS[country] ?? '🌍'
  const totalProducts = enterprises.reduce((s, e) => s + e._count.products, 0)
  const totalDemands  = enterprises.reduce((s, e) => s + e._count.demands, 0)

  return (
    <div className="min-h-screen bg-[#020617]">
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <a href={`/${locale}/countries`} className="text-slate-500 hover:text-white text-sm transition-colors">← {isZh ? '国别馆' : 'Countries'}</a>
          <span className="text-slate-700">/</span>
          <span className="text-xl">{flag}</span>
          <span className="text-white font-bold text-sm">{country}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-6xl">{flag}</span>
          <div>
            <h1 className="text-2xl font-black text-white mb-1">{country}</h1>
            <p className="text-slate-400 text-sm">
              {isZh
                ? `${enterprises.length} 家入驻企业 · ${totalProducts} 条供给 · ${totalDemands} 条需求`
                : `${enterprises.length} enterprises · ${totalProducts} supplies · ${totalDemands} demands`}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: isZh ? '入驻企业' : 'Enterprises', value: enterprises.length, color: 'text-amber-400' },
            { label: isZh ? '供给产品' : 'Products',    value: totalProducts,       color: 'text-emerald-400' },
            { label: isZh ? '采购需求' : 'Demands',     value: totalDemands,        color: 'text-violet-400' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-3 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Enterprise list */}
        <div className="grid sm:grid-cols-2 gap-4">
          {enterprises.map(e => {
            const td = e.tradeDirection ? TRADE_DIR[e.tradeDirection] : null
            return (
              <a key={e.id} href={`/${locale}/enterprise/${e.id}`}
                className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-5 hover:border-amber-500/30 transition-all group block">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors mb-0.5">{e.name}</h3>
                    {e.nameEn && <p className="text-slate-500 text-xs">{e.nameEn}</p>}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2 ${
                    e.status === 'active' ? 'text-emerald-400 bg-emerald-900/30 border border-emerald-700/40' : 'text-slate-500 bg-slate-700/50 border border-slate-600/40'
                  }`}>
                    {e.status === 'active' ? (isZh ? '已认证' : 'Verified') : (isZh ? '审核中' : 'Pending')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {e.industry && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{e.industry}</span>
                  )}
                  {td && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${td.color}`}>
                      {isZh ? td.zh : td.en}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="text-emerald-400">📦 {e._count.products}</span>
                  <span className="text-violet-400">🎯 {e._count.demands}</span>
                  <span className="ml-auto text-amber-400/60 group-hover:text-amber-400 transition-colors">
                    {isZh ? '查看详情 →' : 'View →'}
                  </span>
                </div>
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a href={`/${locale}/onboarding`} className="inline-block px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-500/20 transition-colors">
            {isZh ? `在 ${country} 有业务？免费入驻` : `Doing business in ${country}? Join free`}
          </a>
        </div>
      </div>
    </div>
  )
}
