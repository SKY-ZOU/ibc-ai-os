'use client'

import { useState } from 'react'

const STAGES = [
  { key: 'new',         label: '新商机',   labelEn: 'New',         color: 'border-t-slate-400',   dot: 'bg-slate-400' },
  { key: 'intent',      label: '意向沟通', labelEn: 'Intent',      color: 'border-t-blue-400',    dot: 'bg-blue-400' },
  { key: 'negotiation', label: '报价谈判', labelEn: 'Negotiation', color: 'border-t-amber-400',   dot: 'bg-amber-400' },
  { key: 'contract',    label: '合同确认', labelEn: 'Contract',    color: 'border-t-violet-400',  dot: 'bg-violet-400' },
  { key: 'closed',      label: '已成交',   labelEn: 'Closed',      color: 'border-t-emerald-400', dot: 'bg-emerald-400' },
]

interface Opp {
  id: string
  title: string
  stage: string
  value: number | null
  currency: string
  probability: number
  createdAt: string
  enterprise: { id: string; name: string; country: string }
}

interface Props {
  initialOpps: Opp[]
  isZh: boolean
  locale: string
}

export default function WorkspaceBoard({ initialOpps, isZh, locale }: Props) {
  const [opps, setOpps] = useState<Opp[]>(initialOpps)
  const [moving, setMoving] = useState<string | null>(null)

  const stageKeys = STAGES.map(s => s.key)

  async function moveStage(id: string, direction: 'next' | 'prev') {
    const opp = opps.find(o => o.id === id)
    if (!opp) return
    const idx = stageKeys.indexOf(opp.stage)
    const nextIdx = direction === 'next' ? idx + 1 : idx - 1
    if (nextIdx < 0 || nextIdx >= stageKeys.length) return

    setMoving(id)
    const newStage = stageKeys[nextIdx]
    setOpps(prev => prev.map(o => o.id === id ? { ...o, stage: newStage } : o))

    try {
      await fetch(`/api/opportunities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      })
    } catch {
      setOpps(prev => prev.map(o => o.id === id ? { ...o, stage: opp.stage } : o))
    } finally {
      setMoving(null)
    }
  }

  const pipeline = STAGES.map(s => ({
    ...s,
    deals: opps.filter(o => o.stage === s.key),
  }))

  const totalValue = opps
    .filter(o => o.value)
    .reduce((sum, o) => sum + (o.value ?? 0), 0)

  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` :
    n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: isZh ? '全部商机' : 'Total', value: opps.length, color: 'text-white' },
          { label: isZh ? '进行中' : 'Active', value: opps.filter(o => o.stage !== 'closed').length, color: 'text-amber-400' },
          { label: isZh ? '已成交' : 'Closed', value: opps.filter(o => o.stage === 'closed').length, color: 'text-emerald-400' },
          { label: isZh ? '估算金额' : 'Est. Value', value: totalValue ? fmt(totalValue) : '--', color: 'text-violet-400' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 px-5 py-4">
            <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-6" style={{ minHeight: 480 }}>
        {pipeline.map(col => (
          <div key={col.key} className="flex-shrink-0 w-72">
            <div className={`rounded-t-xl border-t-4 ${col.color} bg-slate-800/70 border border-slate-700/60 border-t-0 px-4 py-3 flex items-center justify-between mb-3`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="text-white font-bold text-sm">{isZh ? col.label : col.labelEn}</span>
              </div>
              <span className="text-slate-400 text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{col.deals.length}</span>
            </div>

            <div className="space-y-3">
              {col.deals.map(deal => {
                const stageIdx = stageKeys.indexOf(deal.stage)
                const isMoving = moving === deal.id
                return (
                  <div key={deal.id} className={`rounded-xl bg-slate-800/60 border border-slate-700/50 p-4 hover:border-amber-500/30 transition-all ${isMoving ? 'opacity-60' : ''}`}>
                    <h4 className="text-white font-bold text-sm leading-snug mb-1 line-clamp-2">{deal.title}</h4>
                    <p className="text-slate-400 text-xs mb-2">{deal.enterprise.name} · {deal.enterprise.country}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-amber-400 font-bold text-sm">{deal.value ? fmt(deal.value) : '--'}</span>
                      <span className="text-slate-500 text-[10px]">{new Date(deal.createdAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {stageIdx > 0 && (
                        <button onClick={() => moveStage(deal.id, 'prev')} disabled={isMoving}
                          className="flex-1 py-1.5 text-xs rounded-lg border border-slate-600 text-slate-400 hover:border-slate-400 hover:text-white transition-colors">
                          ← {isZh ? '回退' : 'Back'}
                        </button>
                      )}
                      {stageIdx < stageKeys.length - 1 && (
                        <button onClick={() => moveStage(deal.id, 'next')} disabled={isMoving}
                          className="flex-1 py-1.5 text-xs rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors">
                          {isZh ? '推进' : 'Advance'} →
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
              <button className="w-full rounded-xl border border-dashed border-slate-700 text-slate-600 hover:border-amber-500/40 hover:text-amber-500/70 py-3 text-xs transition-colors">
                + {isZh ? '添加商机' : 'Add deal'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
