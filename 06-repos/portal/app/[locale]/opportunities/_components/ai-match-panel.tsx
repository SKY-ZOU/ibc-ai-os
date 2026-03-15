'use client'
import { useEffect, useState } from 'react'
import type { MockOpportunity } from '../../../lib/mock-opportunities'
import { CATEGORY_LABELS } from '../../../lib/mock-opportunities'
import { findMatches, type MatchResult } from '../../../lib/match-engine'

function ScoreBar({ score, animate }: { score: number; animate: boolean }) {
  const color = score >= 80 ? 'from-emerald-400 to-emerald-500' : score >= 60 ? 'from-amber-400 to-amber-500' : 'from-slate-400 to-slate-500'
  return (
    <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full transition-all duration-700 ease-out`}
        style={{ width: animate ? `${score}%` : '0%' }}
      />
    </div>
  )
}

function ReasonBadge({ type, label }: { type: 'strong' | 'medium' | 'weak'; label: string }) {
  const cls = type === 'strong'
    ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50'
    : type === 'medium'
    ? 'bg-amber-900/50 text-amber-300 border-amber-700/50'
    : 'bg-slate-700/50 text-slate-400 border-slate-600/50'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${cls}`}>
      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${type === 'strong' ? 'bg-emerald-400' : type === 'medium' ? 'bg-amber-400' : 'bg-slate-500'}`} />
      {label}
    </span>
  )
}

function MatchCard({ result, rank, isZh, animate }: { result: MatchResult; rank: number; isZh: boolean; animate: boolean }) {
  const { supply, score, reasons } = result
  const scoreColor = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-slate-400'
  return (
    <div className="rounded-xl bg-slate-800/80 border border-slate-700/60 p-4 hover:border-amber-500/30 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400">#{rank}</div>
          <span className="text-base">{supply.flag}</span>
          <div>
            <div className="text-white font-semibold text-xs leading-tight">{supply.company}</div>
            <div className="text-slate-500 text-[10px]">{supply.country} · {isZh ? CATEGORY_LABELS[supply.category] || supply.category : supply.category}</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-[10px] text-slate-500">{isZh ? 'AI匹配' : 'AI Match'}</div>
          <div className={`text-lg font-black ${scoreColor}`}>{score}</div>
        </div>
      </div>

      {/* Product */}
      <p className="text-slate-300 text-xs font-medium mb-1 leading-snug">{supply.title}</p>
      <p className="text-slate-500 text-[10px] mb-3">{supply.quantity} {supply.unit} · {supply.price}/{supply.unit}</p>

      {/* Score bar */}
      <div className="mb-3">
        <ScoreBar score={score} animate={animate} />
      </div>

      {/* Reasons */}
      <div className="flex flex-wrap gap-1.5">
        {reasons.map((r) => (
          <ReasonBadge key={r.key} type={r.type} label={isZh ? r.label : r.labelEn} />
        ))}
      </div>

      {/* CTA */}
      <button className="mt-3 w-full py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition-colors">
        {isZh ? '发起撮合' : 'Initiate Match'}
      </button>
    </div>
  )
}

interface Props {
  demand: MockOpportunity | null
  allOpps: MockOpportunity[]
  isZh: boolean
  onClose: () => void
}

export default function AiMatchPanel({ demand, allOpps, isZh, onClose }: Props) {
  const [animate, setAnimate] = useState(false)
  const [results, setResults] = useState<MatchResult[]>([])

  useEffect(() => {
    if (!demand) { setAnimate(false); return }
    setAnimate(false)
    const matches = findMatches(demand, allOpps)
    setResults(matches)
    // Trigger bar animation after mount
    const t = setTimeout(() => setAnimate(true), 80)
    return () => clearTimeout(t)
  }, [demand, allOpps])

  if (!demand) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1526] border-l border-slate-700/60 z-50 flex flex-col shadow-2xl overflow-hidden">

        {/* Panel header */}
        <div className="flex-shrink-0 bg-[#0f172a] border-b border-slate-700/60 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* AI pulse dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-amber-400 font-black text-sm tracking-wide">AI {isZh ? '智能匹配' : 'Smart Match'}</span>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors flex items-center justify-center text-xs">
              ✕
            </button>
          </div>

          {/* Selected demand info */}
          <div className="rounded-lg bg-blue-900/30 border border-blue-700/40 px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold text-blue-400 bg-blue-900/50 px-1.5 py-0.5 rounded">
                {isZh ? '需求方' : 'DEMAND'}
              </span>
              <span className="text-slate-500 text-[10px]">#{demand.id}</span>
            </div>
            <p className="text-white font-semibold text-sm leading-snug">{demand.title}</p>
            <p className="text-slate-400 text-[10px] mt-0.5">{demand.flag} {demand.company} · {demand.country}</p>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {/* Summary */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-xs">
              {isZh ? `为该需求找到 ${results.length} 个匹配供给` : `Found ${results.length} matching suppliers`}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />≥80
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-2" />60–79
            </div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-sm">{isZh ? '暂无高度匹配的供给方' : 'No strong matches found'}</p>
            </div>
          ) : (
            results.map((r, i) => (
              <MatchCard key={r.supply.id} result={r} rank={i + 1} isZh={isZh} animate={animate} />
            ))
          )}

          {/* AI disclaimer */}
          <p className="text-[10px] text-slate-600 text-center pt-2 pb-4">
            {isZh
              ? '以上匹配由 IBC AI 引擎基于品类、结算、标签等多维度计算，仅供参考'
              : 'Matches computed by IBC AI Engine across category, settlement & tag dimensions — for reference only'}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 border-t border-slate-700/60 px-5 py-4 bg-[#0f172a]">
          <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-black text-sm transition-colors">
            {isZh ? '进入撮合工作台' : 'Open Deal Workspace'}
          </button>
        </div>
      </div>
    </>
  )
}
