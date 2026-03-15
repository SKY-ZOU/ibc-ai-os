const PIPELINE = (isZh: boolean) => [
  {
    stage: 'new', label: isZh ? '新商机' : 'New', color: 'border-t-slate-400', dot: 'bg-slate-400',
    deals: [
      { id: 'D001', flag: '🇦🇺', title: isZh ? '铁矿石 62% Fe' : 'Iron Ore 62% Fe', company: 'Pilbara Resources', value: '$4.25M', days: 1, ai: 94, cat: isZh ? '矿产' : 'Minerals' },
      { id: 'D002', flag: '🇧🇷', title: isZh ? '非转基因大豆' : 'Non-GMO Soybean', company: 'Cerrado Agri Group', value: '$3.8M', days: 2, ai: 88, cat: isZh ? '农业' : 'Agri' },
      { id: 'D003', flag: '🇻🇳', title: isZh ? '贴片电容 0402' : 'SMD Capacitor 0402', company: 'Hanoi Electronics', value: '$60K', days: 3, ai: 82, cat: isZh ? '电子' : 'Electronics' },
    ],
  },
  {
    stage: 'intent', label: isZh ? '意向沟通' : 'Intent', color: 'border-t-blue-400', dot: 'bg-blue-400',
    deals: [
      { id: 'D004', flag: '🇿🇦', title: isZh ? '铬铁矿 UG2 精矿' : 'Chromite UG2 Conc.', company: 'JHB Chrome Co.', value: '$3.25M', days: 5, ai: 91, cat: isZh ? '矿产' : 'Minerals' },
      { id: 'D005', flag: '🇳🇬', title: isZh ? '施工挖掘机 50台' : 'Excavators × 50', company: 'Lagos Industrial', value: '$1.4M', days: 4, ai: 73, cat: isZh ? '机械' : 'Machinery' },
    ],
  },
  {
    stage: 'negotiation', label: isZh ? '报价谈判' : 'Negotiation', color: 'border-t-amber-400', dot: 'bg-amber-400',
    deals: [
      { id: 'D006', flag: '🇨🇱', title: isZh ? '铜精矿 Cu 28%' : 'Copper Conc. 28%', company: 'Atacama Mining', value: '$18.4M', days: 8, ai: 97, cat: isZh ? '矿产' : 'Minerals' },
      { id: 'D007', flag: '🇮🇳', title: isZh ? '甲醇工业级' : 'Methanol Industrial', company: 'Mumbai Chem Ind.', value: '$8.4M', days: 6, ai: 89, cat: isZh ? '化工' : 'Chemicals' },
    ],
  },
  {
    stage: 'contract', label: isZh ? '合同确认' : 'Contract', color: 'border-t-violet-400', dot: 'bg-violet-400',
    deals: [
      { id: 'D008', flag: '🇰🇪', title: isZh ? '光伏组件 545W' : 'Solar Panel 545W', company: 'Nairobi Solar', value: '$5.6M', days: 12, ai: 92, cat: isZh ? '能源' : 'Energy' },
    ],
  },
  {
    stage: 'closed', label: isZh ? '已成交' : 'Closed', color: 'border-t-emerald-400', dot: 'bg-emerald-400',
    deals: [
      { id: 'D009', flag: '🇧🇷', title: isZh ? '巴西大豆 1万吨' : 'Brazilian Soy 10KT', company: 'São Paulo Agri', value: '$3.2M', days: 18, ai: 95, cat: isZh ? '农业' : 'Agri' },
      { id: 'D010', flag: '🇻🇳', title: isZh ? '越南电子元件' : 'Vietnam Electronics', company: 'Hanoi Mfr.', value: '$1.9M', days: 22, ai: 88, cat: isZh ? '电子' : 'Electronics' },
    ],
  },
]

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'
  const pipeline = PIPELINE(isZh)
  const totalDeals = pipeline.reduce((s, p) => s + p.deals.length, 0)
  const activeDeals = pipeline.slice(0, 4).reduce((s, p) => s + p.deals.length, 0)
  const closedDeals = pipeline[4].deals.length
  const totalValue = '$50.3M'

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
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
          <div className="flex items-center gap-3">
            <a href={`/${locale}/opportunities`} className="px-4 py-2 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-sm rounded-lg transition-colors">
              {isZh ? '商机池' : 'Opportunities'}
            </a>
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold text-sm rounded-lg transition-colors">
              {isZh ? '+ 新建商机' : '+ New Deal'}
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-[1600px] mx-auto px-6 pt-8 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: isZh ? '全部商机' : 'Total Deals', value: totalDeals, color: 'text-white' },
            { label: isZh ? '进行中' : 'Active', value: activeDeals, color: 'text-amber-400' },
            { label: isZh ? '本月成交' : 'Closed', value: closedDeals, color: 'text-emerald-400' },
            { label: isZh ? '估算总金额' : 'Est. Value', value: totalValue, color: 'text-violet-400' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 px-5 py-4">
              <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-slate-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-6" style={{ minHeight: 520 }}>
          {pipeline.map((col) => (
            <div key={col.stage} className="flex-shrink-0 w-72">
              {/* Column header */}
              <div className={`rounded-t-xl border-t-4 ${col.color} bg-slate-800/70 border border-slate-700/60 border-t-0 px-4 py-3 flex items-center justify-between mb-3`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-white font-bold text-sm">{col.label}</span>
                </div>
                <span className="text-slate-400 text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{col.deals.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {col.deals.map((deal) => (
                  <div key={deal.id}
                    className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-4 hover:border-amber-500/30 hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-lg">{deal.flag}</span>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500">AI</div>
                        <div className={`text-xs font-black ${deal.ai >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{deal.ai}</div>
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-sm leading-snug mb-1 group-hover:text-amber-300 transition-colors">{deal.title}</h4>
                    <p className="text-slate-400 text-xs mb-3">{deal.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-md">{deal.cat}</span>
                      <span className="text-amber-400 font-bold text-sm">{deal.value}</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-600">
                      {isZh ? `${deal.days} 天前更新` : `Updated ${deal.days}d ago`}
                    </div>
                  </div>
                ))}
                {/* Add button */}
                <button className="w-full rounded-xl border border-dashed border-slate-700 text-slate-600 hover:border-amber-500/40 hover:text-amber-500/70 py-3 text-xs transition-colors">
                  + {isZh ? '添加商机' : 'Add deal'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
