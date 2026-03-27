'use client'

import { use, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Users, Package, TrendingUp, RefreshCw, ShieldCheck, Zap } from 'lucide-react'

const ADMIN_KEY = 'IBC_ADMIN_2026'

const STATUS_STYLES: Record<string, string> = {
  pending:  'bg-amber-500/20 text-amber-300 border-amber-500/40',
  approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  rejected: 'bg-red-500/20 text-red-300 border-red-500/40',
  active:   'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
}
const STATUS_LABELS: Record<string, string> = {
  pending: '待审核', approved: '已通过', rejected: '已拒绝', active: '活跃',
}

interface Enterprise {
  id: string
  name: string
  nameEn?: string
  country: string
  industry?: string
  email?: string
  contactName?: string
  tradeDirection?: string
  status: string
  createdAt: string
  _count?: { products: number; demands: number; opportunities: number }
}

interface Stats {
  overview: {
    totalEnterprises: number
    activeEnterprises: number
    totalProducts: number
    totalDemands: number
    totalOpportunities: number
    wonOpportunities: number
  }
}

export default function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  use(params)

  const [tab, setTab]           = useState<'pending' | 'all' | 'stats'>('pending')
  const [enterprises, setEnterprises] = useState<Enterprise[]>([])
  const [stats, setStats]       = useState<Stats | null>(null)
  const [loading, setLoading]   = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)
  const [matchingId, setMatchingId] = useState<string | null>(null)
  const [matchResult, setMatchResult] = useState<string | null>(null)
  const [toast, setToast]       = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchEnterprises = useCallback(async (status?: string) => {
    setLoading(true)
    try {
      const url = status ? `/api/admin/enterprises?status=${status}&limit=50` : '/api/admin/enterprises?limit=100'
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) setEnterprises(data.data)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    const res = await fetch('/api/stats/overview')
    const data = await res.json()
    if (data.success) setStats(data.data)
  }, [])

  useEffect(() => {
    if (tab === 'stats') { fetchStats(); return }
    fetchEnterprises(tab === 'pending' ? 'pending' : undefined)
  }, [tab, fetchEnterprises, fetchStats])

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionId(id)
    try {
      const res = await fetch(`/api/admin/enterprises/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(action === 'approve' ? '✅ 已通过，匹配引擎已触发' : '❌ 已拒绝')
        fetchEnterprises(tab === 'pending' ? 'pending' : undefined)
        if (tab === 'stats') fetchStats()
      } else {
        showToast(data.error ?? '操作失败', false)
      }
    } finally {
      setActionId(null)
    }
  }

  const handleRunMatching = async () => {
    setMatchingId('global')
    setMatchResult(null)
    try {
      const res = await fetch('/api/match/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useAI: true }),
      })
      const data = await res.json()
      if (data.success) {
        const { scanned, created } = data.data
        setMatchResult(`扫描 ${scanned} 对，新建 ${created} 个商机`)
        showToast(`匹配完成：新建 ${created} 个商机`)
      }
    } finally {
      setMatchingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white">IBC Admin</span>
            <span className="text-slate-600 text-sm">运营后台</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunMatching}
              disabled={!!matchingId}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm rounded-xl hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
            >
              {matchingId ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {matchingId ? '匹配中…' : '触发全量匹配'}
            </button>
            {matchResult && <span className="text-xs text-slate-400">{matchResult}</span>}
          </div>
        </div>
      </header>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`fixed top-16 right-4 z-50 px-4 py-3 rounded-xl border text-sm font-medium ${
              toast.ok
                ? 'bg-emerald-900/80 border-emerald-500/40 text-emerald-300'
                : 'bg-red-900/80 border-red-500/40 text-red-300'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit mb-6">
          {([
            ['pending', '待审核', Clock],
            ['all',     '全部企业', Users],
            ['stats',   '统计总览', TrendingUp],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {tab === 'stats' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: '总企业数',   value: stats.overview.totalEnterprises,   icon: Users,      color: 'blue' },
              { label: '已通过企业', value: stats.overview.activeEnterprises,   icon: CheckCircle, color: 'emerald' },
              { label: '供给产品',   value: stats.overview.totalProducts,       icon: Package,    color: 'amber' },
              { label: '采购需求',   value: stats.overview.totalDemands,        icon: TrendingUp, color: 'violet' },
              { label: '商机总数',   value: stats.overview.totalOpportunities,  icon: Zap,        color: 'indigo' },
              { label: '已成交',     value: stats.overview.wonOpportunities,    icon: CheckCircle, color: 'emerald' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-${color}-500/20`}>
                  <Icon className={`w-4 h-4 text-${color}-400`} />
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Enterprise List */}
        {(tab === 'pending' || tab === 'all') && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-500">加载中…</div>
            ) : enterprises.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <CheckCircle className="w-12 h-12 mb-4 opacity-30" />
                <p>{tab === 'pending' ? '暂无待审核企业' : '暂无企业数据'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {enterprises.map(e => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="font-bold text-white text-sm">{e.name}</h3>
                          {e.nameEn && <span className="text-slate-500 text-xs">{e.nameEn}</span>}
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${STATUS_STYLES[e.status] ?? ''}`}>
                            {STATUS_LABELS[e.status] ?? e.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                          <span>🌍 {e.country}</span>
                          {e.industry && <span>🏭 {e.industry}</span>}
                          {e.contactName && <span>👤 {e.contactName}</span>}
                          {e.email && <span>✉️ {e.email}</span>}
                          {e.tradeDirection && (
                            <span>{e.tradeDirection === 'export' ? '📤 出口供给' : e.tradeDirection === 'import' ? '📥 进口采购' : '🔄 双向贸易'}</span>
                          )}
                          {e._count && (
                            <span className="text-slate-500">
                              产品 {e._count.products} · 需求 {e._count.demands} · 商机 {e._count.opportunities}
                            </span>
                          )}
                          <span className="text-slate-600">{new Date(e.createdAt).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </div>

                      {e.status === 'pending' && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleAction(e.id, 'approve')}
                            disabled={actionId === e.id}
                            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            通过
                          </button>
                          <button
                            onClick={() => handleAction(e.id, 'reject')}
                            disabled={actionId === e.id}
                            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold rounded-xl hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            拒绝
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
