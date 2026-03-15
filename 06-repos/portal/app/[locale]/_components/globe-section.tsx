'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const CHINA = { lat: 35, lng: 105 }

const PARTNERS = [
  { lat: 51.5,  lng: -0.1,   label: '伦敦',   en: 'London',     region: '欧洲',   regionEn: 'Europe',    color: '#60a5fa', commodity: '金融服务' },
  { lat: 48.9,  lng: 2.3,    label: '巴黎',   en: 'Paris',      region: '欧洲',   regionEn: 'Europe',    color: '#60a5fa', commodity: '奢侈品' },
  { lat: 52.5,  lng: 13.4,   label: '柏林',   en: 'Berlin',     region: '欧洲',   regionEn: 'Europe',    color: '#60a5fa', commodity: '机械设备' },
  { lat: 40.7,  lng: -74.0,  label: '纽约',   en: 'New York',   region: '北美',   regionEn: 'N.America', color: '#a78bfa', commodity: '金融' },
  { lat: 34.0,  lng: -118,   label: '洛杉矶', en: 'Los Angeles',region: '北美',   regionEn: 'N.America', color: '#a78bfa', commodity: '科技' },
  { lat: -23.5, lng: -46.6,  label: '圣保罗', en: 'São Paulo',  region: '南美',   regionEn: 'S.America', color: '#34d399', commodity: '大豆·铁矿' },
  { lat: -33.9, lng: 18.4,   label: '开普敦', en: 'Cape Town',  region: '非洲',   regionEn: 'Africa',    color: '#fb923c', commodity: '矿产资源' },
  { lat: 6.5,   lng: 3.4,    label: '拉各斯', en: 'Lagos',      region: '非洲',   regionEn: 'Africa',    color: '#fb923c', commodity: '石油' },
  { lat: 25.2,  lng: 55.3,   label: '迪拜',   en: 'Dubai',      region: '中东',   regionEn: 'M.East',    color: '#f472b6', commodity: '能源·黄金' },
  { lat: 24.7,  lng: 46.7,   label: '利雅得', en: 'Riyadh',     region: '中东',   regionEn: 'M.East',    color: '#f472b6', commodity: '石油' },
  { lat: 19.1,  lng: 72.9,   label: '孟买',   en: 'Mumbai',     region: '南亚',   regionEn: 'S.Asia',    color: '#fbbf24', commodity: '纺织品' },
  { lat: 13.8,  lng: 100.5,  label: '曼谷',   en: 'Bangkok',    region: '东南亚', regionEn: 'SE Asia',   color: '#4ade80', commodity: '农产品' },
  { lat: 1.35,  lng: 103.8,  label: '新加坡', en: 'Singapore',  region: '东南亚', regionEn: 'SE Asia',   color: '#4ade80', commodity: '金融·贸易' },
  { lat: -6.2,  lng: 106.8,  label: '雅加达', en: 'Jakarta',    region: '东南亚', regionEn: 'SE Asia',   color: '#4ade80', commodity: '棕榈油' },
  { lat: -33.9, lng: 151.2,  label: '悉尼',   en: 'Sydney',     region: '大洋洲', regionEn: 'Oceania',   color: '#e879f9', commodity: '铁矿石' },
]

const AI_STEPS = (isZh: boolean) => [
  { icon: '🔍', label: isZh ? 'AI 识别供需' : 'AI Identifies Supply/Demand' },
  { icon: '🧠', label: isZh ? 'AI 画像分析' : 'AI Profile Analysis' },
  { icon: '⚡', label: isZh ? 'AI 精准匹配' : 'AI Smart Matching' },
  { icon: '💬', label: isZh ? 'AI 谈判推进' : 'AI Negotiation' },
  { icon: '✅', label: isZh ? '成交结算' : 'Deal & Settlement' },
]

interface Props { isZh: boolean }

export default function GlobeSection({ isZh }: Props) {
  const globeRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [aiStep, setAiStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!globeRef.current || !ready) return
    const ctrl = globeRef.current.controls()
    if (ctrl) { ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.6 }
    globeRef.current.pointOfView({ lat: 20, lng: 100, altitude: isMobile ? 2.8 : 2.2 }, 1200)
  }, [ready, isMobile])

  // Cycle active partner
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % PARTNERS.length), 2000)
    return () => clearInterval(t)
  }, [])

  // Cycle AI pipeline step
  useEffect(() => {
    const t = setInterval(() => setAiStep(i => (i + 1) % 5), 1200)
    return () => clearInterval(t)
  }, [])

  const partner = PARTNERS[activeIdx]
  const steps = AI_STEPS(isZh)
  const globeSize = isMobile ? 320 : 480

  const ARCS = PARTNERS.map((p, i) => ({
    startLat: CHINA.lat, startLng: CHINA.lng,
    endLat: p.lat, endLng: p.lng,
    color: i === activeIdx ? ['#D4AF37', p.color] : [p.color + '60', '#D4AF3740'],
    stroke: i === activeIdx ? 0.8 : 0.3,
  }))

  const POINTS = [
    { lat: CHINA.lat, lng: CHINA.lng, size: 0.9, color: '#D4AF37', label: '🇨🇳 中国枢纽' },
    ...PARTNERS.map((p, i) => ({
      lat: p.lat, lng: p.lng,
      size: i === activeIdx ? 0.6 : 0.3,
      color: i === activeIdx ? p.color : p.color + '80',
      label: `${p.label} · ${p.commodity}`,
    })),
  ]

  return (
    <section className="relative bg-[#020617] overflow-hidden">
      {/* Top border gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* BG glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-900/15 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">
              {isZh ? 'AI 全球贸易网络 · 实时在线' : 'AI Global Trade Network · Live'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">
            {isZh ? '以中国为枢纽' : 'China as the Hub'}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">
              {isZh ? 'AI 驱动全球贸易网络' : 'AI-Powered Global Trade'}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '连接 58 个国家，AI 实时匹配供需，非美元结算，从意向到成交最快 72 小时'
              : 'Connecting 58 countries with AI real-time matching, non-USD settlement — deal closure in as fast as 72 hours'}
          </p>
        </div>

        {/* Main layout: Globe + Right panel */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Globe */}
          <div className="flex-shrink-0 flex justify-center items-center relative" style={{ width: globeSize, height: globeSize }}>
            {ready ? (
              <Globe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                atmosphereColor="#4338ca"
                atmosphereAltitude={0.18}
                arcsData={ARCS}
                arcColor="color"
                arcDashLength={0.5}
                arcDashGap={0.1}
                arcDashAnimateTime={1800}
                arcStroke="stroke"
                arcAltitude={0.28}
                pointsData={POINTS}
                pointColor="color"
                pointRadius="size"
                pointAltitude={0.01}
                pointLabel="label"
                ringsData={[{ lat: partner.lat, lng: partner.lng }]}
                ringColor={() => partner.color}
                ringMaxRadius={4}
                ringPropagationSpeed={3}
                ringRepeatPeriod={1500}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-14 h-14 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
              </div>
            )}
            {/* China hub label */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-amber-500/20 border border-amber-500/40 rounded-full px-3 py-1 text-amber-300 text-xs font-bold whitespace-nowrap backdrop-blur">
              🇨🇳 {isZh ? '中国 · 核心枢纽' : 'China · Core Hub'}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 w-full space-y-4">

            {/* Active connection card */}
            <div className="rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden"
              style={{ borderColor: partner.color + '50' }}>
              <div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {isZh ? '🤖 AI 正在撮合' : '🤖 AI Matching'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">🇨🇳</span>
                    <span className="text-amber-400 text-xs font-bold mt-1">{isZh ? '中国' : 'China'}</span>
                  </div>
                  <div className="flex-1 relative mx-2">
                    <div className="h-px bg-gradient-to-r from-amber-400 to-transparent absolute w-full top-1/2" />
                    <div className="h-px bg-gradient-to-l from-transparent absolute w-full top-1/2"
                      style={{ background: `linear-gradient(to right, transparent, ${partner.color})` }} />
                    {/* Pulse dot traveling */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-bounce"
                      style={{ backgroundColor: partner.color, left: '45%' }} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">🌐</span>
                    <span className="text-xs font-bold mt-1" style={{ color: partner.color }}>{isZh ? partner.label : partner.en}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/5 rounded-lg px-3 py-2">
                    <div className="text-slate-500 mb-0.5">{isZh ? '区域' : 'Region'}</div>
                    <div className="text-white font-semibold">{isZh ? partner.region : partner.regionEn}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2">
                    <div className="text-slate-500 mb-0.5">{isZh ? '品类' : 'Category'}</div>
                    <div className="font-semibold" style={{ color: partner.color }}>{partner.commodity}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Pipeline */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">
                {isZh ? 'AI 处理流程' : 'AI Pipeline'}
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                {steps.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full flex flex-col items-center py-2 px-1 rounded-xl border transition-all duration-500 ${
                      i === aiStep
                        ? 'border-indigo-500/60 bg-indigo-500/20 shadow-lg shadow-indigo-500/20 scale-105'
                        : i < aiStep
                        ? 'border-emerald-500/30 bg-emerald-500/10'
                        : 'border-white/5 bg-white/[0.02]'
                    }`}>
                      <span className="text-base sm:text-xl">{s.icon}</span>
                      <span className={`text-[9px] sm:text-[10px] font-bold text-center leading-tight mt-1 ${
                        i === aiStep ? 'text-indigo-300' : i < aiStep ? 'text-emerald-400' : 'text-slate-600'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-px w-full mt-1 ${i < aiStep ? 'bg-emerald-500/50' : 'bg-white/5'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: '58', label: isZh ? '覆盖国家' : 'Countries', icon: '🌍' },
                { value: '1,200+', label: isZh ? '入驻企业' : 'Enterprises', icon: '🏢' },
                { value: '$2.4B+', label: isZh ? '撮合交易' : 'Trade Volume', icon: '💰' },
                { value: '72h', label: isZh ? '最快成交' : 'Fastest Deal', icon: '⚡' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl mb-1">{s.icon}</div>
                  <div className="text-lg sm:text-2xl font-black text-white leading-none">{s.value}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Region coverage pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: isZh ? '🌍 欧洲' : '🌍 Europe', color: '#60a5fa' },
                { label: isZh ? '🌎 北美' : '🌎 N.America', color: '#a78bfa' },
                { label: isZh ? '🌎 南美' : '🌎 S.America', color: '#34d399' },
                { label: isZh ? '🌍 非洲' : '🌍 Africa', color: '#fb923c' },
                { label: isZh ? '🕌 中东' : '🕌 M.East', color: '#f472b6' },
                { label: isZh ? '🇮🇳 南亚' : '🇮🇳 S.Asia', color: '#fbbf24' },
                { label: isZh ? '🌏 东南亚' : '🌏 SE.Asia', color: '#4ade80' },
                { label: isZh ? '🦘 大洋洲' : '🦘 Oceania', color: '#e879f9' },
              ].map(r => (
                <span key={r.label}
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: r.color + '40', color: r.color, backgroundColor: r.color + '10' }}>
                  {r.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
    </section>
  )
}
