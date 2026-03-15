export default async function CountriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6">🌏</div>
        <h1 className="text-3xl font-black text-white mb-4">
          {isZh ? '国别馆' : 'Country Pavilion'}
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          {isZh ? '即将上线 · 敬请期待' : 'Coming Soon · Stay Tuned'}
        </p>
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isZh ? '返回首页' : 'Back to Home'}
        </a>
      </div>
    </div>
  )
}
