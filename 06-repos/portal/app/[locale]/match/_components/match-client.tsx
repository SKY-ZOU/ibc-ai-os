'use client'

import { useState, useCallback, useEffect } from 'react'

export interface MatchResult {
  id: string
  type: 'supply' | 'demand'
  category: string
  aiScore: number
  title: string
  company: string
  companyEn?: string
  country: string
  flag: string
  tags: string[]
  value?: string
  currency?: string
  description?: string
}

const CATEGORY_OPTIONS = [
  { value: 'all', zh: '全部品类', en: 'All Categories' },
  { value: 'energy', zh: '能源矿产', en: 'Energy & Mining' },
  { value: 'agriculture', zh: '农业食品', en: 'Agriculture & Food' },
  { value: 'machinery', zh: '机械设备', en: 'Machinery' },
  { value: 'electronics', zh: '电子科技', en: 'Electronics & Tech' },
  { value: 'chemicals', zh: '化工原料', en: 'Chemicals' },
  { value: 'textiles', zh: '纺织服装', en: 'Textiles & Apparel' },
  { value: 'metals', zh: '金属材料', en: 'Metals & Materials' },
  { value: 'food', zh: '食品饮料', en: 'Food & Beverage' },
]

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 90
      ? 'bg-emerald-500'
      : score >= 75
        ? 'bg-amber-500'
        : score >= 60
          ? 'bg-blue-500'
          : 'bg-slate-400'

  const textColor =
    score >= 90
      ? 'text-emerald-600'
      : score >= 75
        ? 'text-amber-600'
        : score >= 60
          ? 'text-blue-600'
          : 'text-slate-500'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-black w-8 text-right ${textColor}`}>{score}</span>
    </div>
  )
}

function MatchCard({ m, isZh }: { m: MatchResult; isZh: boolean }) {
  const typeColor = m.type === 'supply' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
  const scoreLabel = m.aiScore >= 90 ? (isZh ? '极高匹配' : 'Excellent') : m.aiScore >= 75 ? (isZh ? '高度匹配' : 'High') : m.aiScore >= 60 ? (isZh ? '中等匹配' : 'Medium') : (isZh ? '一般匹配' : 'Low')

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-5 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/60 hover:-translate-y-0.5 transition-all duration-300">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${typeColor}`}>
            {m.type === 'supply' ? (isZh ? '供给' : 'Supply') : (isZh ? '需求' : 'Demand')}
          </span>
          <span className="text-lg">{m.flag}</span>
          <span className="text-xs text-slate-400">{m.country}</span>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{scoreLabel}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-[#0f172a] text-sm mb-1 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
        {m.title}
      </h3>
      <p className="text-slate-400 text-xs mb-3">
        {m.company}{m.companyEn && m.companyEn !== m.company ? ` · ${m.companyEn}` : ''}
      </p>

      {/* Description */}
      {m.description && (
        <p className="text-slate-500 text-xs mb-3 line-clamp-2 leading-relaxed">{m.description}</p>
      )}

      {/* Score bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            {isZh ? 'AI 匹配度' : 'AI Match Score'}
          </span>
        </div>
        <ScoreBar score={m.aiScore} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {m.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
              {t}
            </span>
          ))}
        </div>
        {m.value && (
          <span className="text-xs font-bold text-[#0f172a]">{m.value}</span>
        )}
      </div>
    </div>
  )
}

export default function MatchClient({ isZh }: { locale: string; isZh: boolean }) {
  const [category, setCategory] = useState('all')
  const [country, setCountry] = useState('')
  const [type, setType] = useState<'all' | 'supply' | 'demand'>('all')
  const [q, setQ] = useState('')
  const [results, setResults] = useState<MatchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [error, setError] = useState('')

  const search = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (category !== 'all') params.set('category', category)
      if (country) params.set('country', country)
      if (type !== 'all') params.set('type', type)
      if (q) params.set('q', q)

      const res2 = await fetch(`/api/match?${params}`)
      if (!res2.ok) throw new Error('Request failed')
      const json = await res2.json()
      setResults(json.data || [])
      setFetched(true)
    } catch {
      setError(isZh ? '获取数据失败，请重试' : 'Failed to fetch results, please try again')
    } finally {
      setLoading(false)
    }
  }, [category, country, type, q, isZh])

  // Auto-load on first render
  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const typeButtons: { value: typeof type; zh: string; en: string }[] = [
    { value: 'all', zh: '全部', en: 'All' },
    { value: 'supply', zh: '供给', en: 'Supply' },
    { value: 'demand', zh: '需求', en: 'Demand' },
  ]

  return (
    <div>
      {/* Filter Form */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8 shadow-sm">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
          {isZh ? '筛选条件' : 'Filter Criteria'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              {isZh ? '品类' : 'Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isZh ? opt.zh : opt.en}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              {isZh ? '国家/地区' : 'Country/Region'}
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={isZh ? '输入国家名称' : 'Enter country name'}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              {isZh ? '供需类型' : 'Type'}
            </label>
            <div className="flex gap-1">
              {typeButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setType(btn.value)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    type === btn.value
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {isZh ? btn.zh : btn.en}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              {isZh ? '关键词' : 'Keyword'}
            </label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder={isZh ? '企业、商品、标签...' : 'Company, product, tag...'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {fetched
              ? isZh
                ? `共找到 ${results.length} 条匹配结果`
                : `Found ${results.length} matching results`
              : isZh ? '点击搜索获取 AI 匹配结果' : 'Click search to get AI match results'}
          </p>
          <button
            onClick={search}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-[#0f172a] font-bold text-sm rounded-xl transition-colors"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isZh ? 'AI 匹配中...' : 'Matching...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {isZh ? 'AI 匹配' : 'AI Match'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-14 bg-slate-100 rounded-lg" />
                <div className="h-4 w-20 bg-slate-100 rounded" />
              </div>
              <div className="h-4 bg-slate-100 rounded mb-2 w-full" />
              <div className="h-3 bg-slate-100 rounded mb-3 w-2/3" />
              <div className="h-3 bg-slate-100 rounded mb-1 w-full" />
              <div className="h-2 bg-slate-100 rounded-full w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && fetched && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {results
            .sort((a, b) => b.aiScore - a.aiScore)
            .map((m) => (
              <MatchCard key={m.id} m={m} isZh={isZh} />
            ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && fetched && results.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🤖</div>
          <p className="font-semibold text-base mb-1">
            {isZh ? '未找到匹配结果' : 'No matching results found'}
          </p>
          <p className="text-sm">
            {isZh ? '尝试调整筛选条件或关键词' : 'Try adjusting your filters or keywords'}
          </p>
        </div>
      )}

      {/* Initial state */}
      {!loading && !fetched && (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🌐</div>
          <p className="font-semibold text-base mb-1">
            {isZh ? '设置筛选条件后开始 AI 匹配' : 'Set filters to start AI matching'}
          </p>
          <p className="text-sm">
            {isZh ? 'AI 将从全球供需池中找到最佳匹配' : 'AI will find the best matches from the global pool'}
          </p>
        </div>
      )}
    </div>
  )
}
