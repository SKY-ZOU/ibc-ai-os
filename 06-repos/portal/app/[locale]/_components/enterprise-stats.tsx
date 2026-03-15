'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Stat = {
  prefix?: string
  target: number
  decimals?: number
  suffix: string
  label: string
  color: string
}

const STATS: Stat[] = [
  { target: 1200, suffix: '+', label: '已入驻企业', color: 'from-amber-400 to-amber-600' },
  { prefix: '$', target: 24, decimals: 1, suffix: 'B+', label: '累计撮合交易额', color: 'from-emerald-400 to-teal-500' },
  { target: 58, suffix: '', label: '覆盖国家与地区', color: 'from-blue-400 to-indigo-500' },
  { target: 99, decimals: 1, suffix: '%', label: '贸易履约完成率', color: 'from-violet-400 to-purple-600' },
]

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * stat.target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, stat.target])

  const display = stat.decimals
    ? value.toFixed(stat.decimals)
    : Math.floor(value).toLocaleString()

  return (
    <span ref={ref}>
      {stat.prefix ?? ''}{display}{stat.suffix}
    </span>
  )
}

export default function EnterpriseStats({ isZh }: { isZh: boolean }) {
  const STATS_LOCALIZED: Stat[] = [
    { target: 1200, suffix: '+', label: isZh ? '已入驻企业' : 'Enterprises Joined', color: 'from-amber-400 to-amber-600' },
    { prefix: '$', target: 2.4, decimals: 1, suffix: 'B+', label: isZh ? '累计撮合交易额' : 'Trade Facilitated', color: 'from-emerald-400 to-teal-500' },
    { target: 58, suffix: '', label: isZh ? '覆盖国家与地区' : 'Countries & Regions', color: 'from-blue-400 to-indigo-500' },
    { target: 99.2, decimals: 1, suffix: '%', label: isZh ? '贸易履约完成率' : 'Fulfillment Rate', color: 'from-violet-400 to-purple-600' },
  ]

  return (
    <section className="py-20 bg-[#0a1020] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">
              {isZh ? '平台实时数据' : 'Live Platform Stats'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {isZh ? '全球企业信任的选择' : 'Trusted by Global Enterprises'}
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            {isZh
              ? '数字背后是每一笔真实撮合的跨境贸易，持续增长中'
              : 'Behind every number is a real cross-border deal — and we\'re just getting started'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_LOCALIZED.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/60 p-7 text-center hover:border-slate-700 transition-colors"
            >
              {/* Gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <Counter stat={stat} />
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={`#`}
            onClick={(e) => { e.preventDefault(); window.location.href = window.location.pathname.split('/').slice(0,2).join('/') + '/onboarding' }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0a1020] font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 text-sm"
          >
            {isZh ? '立即免费入驻，加入全球贸易网络' : 'Join Free — Enter the Global Trade Network'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
