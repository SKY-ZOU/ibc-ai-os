'use client'

import { useState } from 'react'

interface Product {
  id: string; name: string; category: string; status: string
  priceMin: number | null; priceMax: number | null; currency: string; createdAt: string
}
interface Demand {
  id: string; title: string; category: string; status: string
  budgetMin: number | null; budgetMax: number | null; currency: string; createdAt: string
}
interface Opportunity {
  id: string; title: string; stage: string; value: number | null; currency: string; createdAt: string
}

interface Props {
  products: Product[]
  demands: Demand[]
  opportunities: Opportunity[]
  isZh: boolean
  locale: string
}

const STAGE_LABELS: Record<string, { zh: string; color: string }> = {
  new:         { zh: '新商机',   color: 'text-slate-400 bg-slate-700/50' },
  intent:      { zh: '意向沟通', color: 'text-blue-400 bg-blue-900/30' },
  negotiation: { zh: '报价谈判', color: 'text-amber-400 bg-amber-900/30' },
  contract:    { zh: '合同确认', color: 'text-violet-400 bg-violet-900/30' },
  closed:      { zh: '已成交',   color: 'text-emerald-400 bg-emerald-900/30' },
}

function fmt(n: number | null, currency: string) {
  if (!n) return '--'
  return n >= 1_000_000 ? `${currency} ${(n/1_000_000).toFixed(1)}M`
       : n >= 1_000     ? `${currency} ${(n/1_000).toFixed(0)}K`
       : `${currency} ${n}`
}

export default function EnterpriseTabs({ products, demands, opportunities, isZh, locale }: Props) {
  const tabs = [
    { key: 'products',     label: isZh ? `供给 (${products.length})`     : `Supply (${products.length})` },
    { key: 'demands',      label: isZh ? `需求 (${demands.length})`      : `Demand (${demands.length})` },
    { key: 'opportunities',label: isZh ? `商机 (${opportunities.length})`: `Deals (${opportunities.length})` },
  ]
  const [active, setActive] = useState('products')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-slate-800 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              active === t.key
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Products */}
      {active === 'products' && (
        products.length === 0
          ? <Empty isZh={isZh} type="supply" locale={locale} />
          : <div className="grid sm:grid-cols-2 gap-3">
              {products.map(p => (
                <div key={p.id} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-bold text-sm">{p.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.status === 'active' ? 'text-emerald-400 bg-emerald-900/30' : 'text-slate-500 bg-slate-700/50'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{p.category}</p>
                  <p className="text-amber-400 font-bold text-xs">
                    {p.priceMin || p.priceMax ? `${fmt(p.priceMin, p.currency)} ~ ${fmt(p.priceMax, p.currency)}` : '--'}
                  </p>
                </div>
              ))}
            </div>
      )}

      {/* Demands */}
      {active === 'demands' && (
        demands.length === 0
          ? <Empty isZh={isZh} type="demand" locale={locale} />
          : <div className="grid sm:grid-cols-2 gap-3">
              {demands.map(d => (
                <div key={d.id} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-bold text-sm">{d.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${d.status === 'open' ? 'text-blue-400 bg-blue-900/30' : 'text-slate-500 bg-slate-700/50'}`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{d.category}</p>
                  <p className="text-violet-400 font-bold text-xs">
                    {d.budgetMin || d.budgetMax ? `${fmt(d.budgetMin, d.currency)} ~ ${fmt(d.budgetMax, d.currency)}` : '--'}
                  </p>
                </div>
              ))}
            </div>
      )}

      {/* Opportunities */}
      {active === 'opportunities' && (
        opportunities.length === 0
          ? <Empty isZh={isZh} type="opp" locale={locale} />
          : <div className="grid sm:grid-cols-2 gap-3">
              {opportunities.map(o => {
                const stg = STAGE_LABELS[o.stage] ?? { zh: o.stage, color: 'text-slate-400 bg-slate-700/50' }
                return (
                  <div key={o.id} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-bold text-sm line-clamp-2">{o.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2 ${stg.color}`}>
                        {isZh ? stg.zh : o.stage}
                      </span>
                    </div>
                    <p className="text-amber-400 font-bold text-xs">{fmt(o.value, o.currency)}</p>
                  </div>
                )
              })}
            </div>
      )}
    </div>
  )
}

function Empty({ isZh, type, locale }: { isZh: boolean; type: string; locale: string }) {
  const links: Record<string, { href: string; label: string; labelEn: string }> = {
    supply: { href: `/${locale}/supply`, label: '发布供给', labelEn: 'Post Supply' },
    demand: { href: `/${locale}/demand`, label: '发布需求', labelEn: 'Post Demand' },
    opp:    { href: `/${locale}/match`,  label: '开始匹配', labelEn: 'Start Matching' },
  }
  const link = links[type]
  return (
    <div className="text-center py-12 text-slate-500">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-sm mb-4">{isZh ? '暂无数据' : 'No data yet'}</p>
      {link && (
        <a href={link.href} className="inline-block px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-xl hover:bg-amber-500/20 transition-colors">
          {isZh ? link.label : link.labelEn}
        </a>
      )}
    </div>
  )
}
