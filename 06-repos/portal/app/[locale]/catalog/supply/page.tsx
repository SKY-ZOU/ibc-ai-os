import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'

const CATS = ['农产品','矿产资源','能源','化工品','钢铁金属','纺织品','电子产品','机械设备','建材','消费品','医疗健康','其他']

function fmtPrice(min: number | null, max: number | null, currency: string) {
  if (!min && !max) return '--'
  const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(0)}K` : `${n}`
  if (min && max) return `${currency} ${fmt(min)}~${fmt(max)}`
  return `${currency} ${fmt((min ?? max)!)}`
}

export default async function SupplyCatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  const products = await prisma.product.findMany({
    where: { status: 'active' },
    include: { enterprise: { select: { id: true, name: true, country: true } } },
    orderBy: { createdAt: 'desc' },
    take: 60,
  })

  return (
    <div className="min-h-screen bg-[#020617]">
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={`/${locale}`} className="text-slate-500 hover:text-white text-sm transition-colors">← {isZh ? '首页' : 'Home'}</a>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold text-sm">{isZh ? '全球供给目录' : 'Supply Catalog'}</span>
          </div>
          <a href={`/${locale}/supply`} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold rounded-xl hover:bg-emerald-500/20 transition-colors">
            + {isZh ? '发布供给' : 'Post Supply'}
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2">{isZh ? '🌍 全球供给目录' : '🌍 Global Supply Catalog'}</h1>
          <p className="text-slate-400 text-sm">{isZh ? `${products.length} 条供给信息，覆盖全球贸易商品` : `${products.length} supply listings from global enterprises`}</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['全部', ...CATS].map(c => (
            <span key={c} className="px-3 py-1 text-xs rounded-full border border-slate-700 text-slate-400 cursor-pointer hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
              {c}
            </span>
          ))}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-slate-500 text-sm mb-4">{isZh ? '暂无供给信息' : 'No supply listings yet'}</p>
            <a href={`/${locale}/supply`} className="inline-block px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold hover:bg-emerald-500/20 transition-colors">
              {isZh ? '发布第一条供给' : 'Post the first supply'}
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-5 hover:border-emerald-500/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
                    {p.category}
                  </span>
                  {p.origin && <span className="text-[10px] text-slate-500">{p.origin}</span>}
                </div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors line-clamp-2">{p.name}</h3>
                <p className="text-slate-500 text-xs mb-3">{p.enterprise.name} · {p.enterprise.country}</p>
                {p.description && <p className="text-slate-400 text-xs mb-3 line-clamp-2">{p.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-sm">{fmtPrice(p.priceMin, p.priceMax, p.currency)}</span>
                  {p.unit && <span className="text-slate-600 text-xs">/ {p.unit}</span>}
                </div>
                {p.minQty && (
                  <p className="text-slate-600 text-[10px] mt-1">{isZh ? `最小起订: ${p.minQty} ${p.unit ?? ''}` : `MOQ: ${p.minQty} ${p.unit ?? ''}`}</p>
                )}
                <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
                  <a href={`/${locale}/enterprise/${p.enterprise.id}`} className="flex-1 text-center py-1.5 text-xs rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white transition-colors">
                    {isZh ? '查看企业' : 'Enterprise'}
                  </a>
                  <a href={`/${locale}/match`} className="flex-1 text-center py-1.5 text-xs rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors">
                    {isZh ? 'AI匹配' : 'AI Match'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
