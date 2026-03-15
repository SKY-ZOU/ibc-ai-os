'use client'

import { motion } from 'framer-motion'
import { Globe2, ArrowRight, Zap } from 'lucide-react'

interface Props {
  isZh: boolean
  locale: string
}

export default function CountryPavilionClient({ isZh, locale }: Props) {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[160px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.a
          href={`/${locale}/countries`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative block overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-12 md:p-20 hover:border-indigo-500/20 transition-all duration-700"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 mb-8"
              >
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">
                  {isZh ? '全球商机实时互联' : 'Real-time Global Connect'}
                </span>
              </motion.div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                {isZh ? '🌏 国别馆' : '🌏 Country Pavilion'}
              </h3>
              <p className="text-slate-400 text-xl leading-relaxed mb-10 font-medium">
                {isZh
                  ? '浏览 58 个国家与地区的供需信息，发现专属商机，通过 AI 直连全球贸易合作伙伴。'
                  : 'Explore supply & demand across 58 countries, discover tailored opportunities, and connect with global partners via AI.'}
              </p>
              
              <div className="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 group-hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)]">
                {isZh ? '进入国别馆' : 'Enter Pavilion'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </div>
            </div>

            {/* Visual Element: Floating Globe / Data Nodes */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 shrink-0">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
              <Globe2 className="w-full h-full text-indigo-400/20 animate-spin-slow" />
              {/* Overlay Dots to simulate data nodes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0]
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                  className="absolute w-2 h-2 bg-indigo-400 rounded-full"
                  style={{ 
                    top: `${Math.random() * 80 + 10}%`, 
                    left: `${Math.random() * 80 + 10}%` 
                  }}
                />
              ))}
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
