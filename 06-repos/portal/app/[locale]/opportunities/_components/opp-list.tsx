'use client'
import { useState, useMemo } from 'react'
import type { MockOpportunity } from '../../../lib/mock-opportunities'
import { CATEGORY_LABELS } from '../../../lib/mock-opportunities'
import dynamic from 'next/dynamic'

const AiMatchPanel = dynamic(() => import('./ai-match-panel'), { ssr: false })

const SETTLEMENT_COLORS: Record<string, string> = {
  USDT: 'bg-emerald-100 text-emerald-700',
  USDC: 'bg-blue-100 text-blue-700',
  RMB: 'bg-red-100 text-red-700',
  USD: 'bg-slate-100 text-slate-600',
  BRL: 'bg-green-100 text-green-700',
  INR: 'bg-orange-100 text-orange-700',
  KES: 'bg-violet-100 text-violet-700',
}

export default function OppList({ opps, locale, isZh }: {
  opps: MockOpportunity[]
  locale: string
  isZh: boolean
}) {
  const [type, setType] = useState<'all' | 'supply' | 'demand'>('all')
  const [category, setCategory] = useState('all')
  const [q, setQ] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [selectedDemand, setSelectedDemand] = useState<MockOpportunity | null>(null)

  const filtered = useMemo(() => opps.filter((o) => {
    if (type !== 'all' && o.type !== type) return false
    if (category !== 'all' && o.category !== category) return false
    if (minScore > 0 && o.aiScore < minScore) return false
    if (q) {
      const lq = q.toLowerCase()
      return o.title.toLowerCase().includes(lq) || o.company.toLowerCase().includes(lq) ||
        o.country.toLowerCase().includes(lq) || o.tags.some((t) => t.toLowerCase().includes(lq))
    }
    return true
  }), [opps, type, category, q, minScore])

  const cats = ['all', ...Array.from(new Set(opps.map((o) => o.category)))]

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-56 flex-shrink-0 space-y-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{isZh ? '类型' : 'Type'}</p>
            <div className="flex flex-col gap-1">
              {(['all', 'supply', 'demand'] as const).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${type === t ? 'bg-[#0f172a] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
                  {t === 'all' ? (isZh ? '全部' : 'All') : t === 'supply' ? (isZh ? '供给' : 'Supply') : (isZh ? '需求' : 'Demand')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{isZh ? '行业' : 'Category'}</p>
            <div className="flex flex-col gap-1">
              {cats.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? 'bg-[#0f172a] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
                  {c === 'all' ? (isZh ? '全部行业' : 'All') : CATEGORY_LABELS[c] || c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {isZh ? `AI匹配分 ≥ ${minScore}` : `AI Score ≥ ${minScore}`}
            </p>
            <input type="range" min={0} max={90} step={10} value={minScore}
              onChange={(e) => setMinScore(+e.target.value)}
              className="w-full accent-amber-500" />
          </div>

          {/* AI Match hint */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-xs font-black text-amber-700">AI {isZh ? '智能匹配' : 'Smart Match'}</span>
            </div>
            <p className="text-[11px] text-amber-600 leading-relaxed">
              {isZh
                ? '点击任意「需求」卡片的 AI匹配 按钮，查看最优供给方匹配列表'
                : 'Click "AI Match" on any demand card to see ranked supplier matches'}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={isZh ? '搜索商品、国家、公司...' : 'Search commodity, country, company...'}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" />
          </div>
          <p className="text-slate-400 text-xs mb-4">{isZh ? `共 ${filtered.length} 条商机` : `${filtered.length} opportunities`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((o) => {
              const isDemand = o.type === 'demand'
              const isSelected = selectedDemand?.id === o.id
              return (
                <div key={o.id}
                  className={`group bg-white rounded-2xl border p-5 transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-400 shadow-xl shadow-amber-50/80 -translate-y-0.5'
                      : 'border-slate-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/60 hover:-translate-y-0.5'
                  }`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${o.type === 'supply' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {o.type === 'supply' ? (isZh ? '供给' : 'Supply') : (isZh ? '需求' : 'Demand')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">{o.flag}</span>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">{isZh ? 'AI匹配' : 'AI Score'}</div>
                        <div className={`text-sm font-black ${o.aiScore >= 90 ? 'text-emerald-600' : o.aiScore >= 80 ? 'text-amber-600' : 'text-slate-500'}`}>{o.aiScore}</div>
                      </div>
                    </div>
                  </div>
                  <h3 className={`font-bold text-sm mb-1 leading-snug transition-colors ${isSelected ? 'text-amber-600' : 'text-[#0f172a] group-hover:text-amber-600'}`}>{o.title}</h3>
                  <p className="text-slate-400 text-xs mb-3">{o.company} · {o.country}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-xs">{o.quantity} {o.unit}</span>
                    <span className="font-bold text-[#0f172a] text-sm">{o.price}/{o.unit}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {o.settlement.slice(0, 3).map((s) => (
                      <span key={s} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${SETTLEMENT_COLORS[s] ?? 'bg-slate-100 text-slate-500'}`}>{s}</span>
                    ))}
                  </div>

                  {/* AI Match button — demand cards only */}
                  {isDemand && (
                    <button
                      onClick={() => setSelectedDemand(isSelected ? null : o)}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200'
                      }`}>
                      <span className="relative flex h-1.5 w-1.5">
                        {isSelected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />}
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isSelected ? 'bg-white' : 'bg-amber-400'}`} />
                      </span>
                      {isSelected
                        ? (isZh ? '正在匹配中...' : 'Matching...')
                        : (isZh ? 'AI 智能匹配' : 'AI Smart Match')}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">{isZh ? '暂无匹配商机' : 'No matching opportunities'}</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Match Panel (slide-in) */}
      <AiMatchPanel
        demand={selectedDemand}
        allOpps={opps}
        isZh={isZh}
        onClose={() => setSelectedDemand(null)}
      />
    </>
  )
}
