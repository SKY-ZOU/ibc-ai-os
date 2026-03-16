import { prisma } from '../../../lib/prisma'

export const dynamic = 'force-dynamic'

const FLAGS: Record<string, string> = {
  '中国': '🇨🇳', '美国': '🇺🇸', '英国': '🇬🇧', '德国': '🇩🇪', '法国': '🇫🇷',
  '澳大利亚': '🇦🇺', '迪拜/UAE': '🇦🇪', '沙特阿拉伯': '🇸🇦', '印度': '🇮🇳',
  '新加坡': '🇸🇬', '印度尼西亚': '🇮🇩', '泰国': '🇹🇭', '越南': '🇻🇳',
  '巴西': '🇧🇷', '南非': '🇿🇦', '尼日利亚': '🇳🇬', '俄罗斯': '🇷🇺',
  '智利': '🇨🇱', 'Global': '🌐', '其他': '🌍',
}

export default async function CountriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  // Group enterprises by country
  const enterprises = await prisma.enterprise.findMany({
    where: { NOT: { id: 'system' } },
    select: { id: true, name: true, country: true, industry: true, status: true },
    orderBy: { createdAt: 'desc' },
  })

  const countryMap = new Map<string, typeof enterprises>()
  for (const e of enterprises) {
    const arr = countryMap.get(e.country) ?? []
    arr.push(e)
    countryMap.set(e.country, arr)
  }

  const countries = Array.from(countryMap.entries())
    .sort((a, b) => b[1].length - a[1].length)

  return (
    <div className="min-h-screen bg-[#020617]">
      <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href={`/${locale}`} className="text-slate-500 hover:text-white text-sm transition-colors">← {isZh ? '首页' : 'Home'}</a>
            <span className="text-slate-700">/</span>
            <span className="text-white font-bold text-sm">{isZh ? '国别馆' : 'Country Pavilion'}</span>
          </div>
          <a href={`/${locale}/onboarding`} className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold rounded-xl hover:bg-amber-500/20 transition-colors">
            {isZh ? '+ 免费入驻' : '+ Free Join'}
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-2">🌏 {isZh ? '全球国别馆' : 'Country Pavilion'}</h1>
          <p className="text-slate-400 text-sm">
            {isZh
              ? `已覆盖 ${countries.length} 个国家和地区，${enterprises.length} 家企业`
              : `${countries.length} countries · ${enterprises.length} enterprises`}
          </p>
        </div>

        {countries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌏</div>
            <p className="text-slate-500 text-sm mb-4">{isZh ? '暂无入驻企业' : 'No enterprises yet'}</p>
            <a href={`/${locale}/onboarding`} className="inline-block px-6 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-500/20 transition-colors">
              {isZh ? '立即入驻' : 'Join Now'}
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map(([country, ents]) => (
              <a key={country} href={`/${locale}/countries/${encodeURIComponent(country)}`}
                className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-5 hover:border-amber-500/30 transition-all group block">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{FLAGS[country] ?? '🌍'}</span>
                  <div>
                    <h3 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors">{country}</h3>
                    <p className="text-slate-500 text-xs">{ents.length} {isZh ? '家企业' : 'enterprises'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ents.slice(0, 3).map(e => (
                    <span key={e.id} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{e.name}</span>
                  ))}
                  {ents.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/20 text-amber-500 border border-amber-800/30">+{ents.length - 3}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
