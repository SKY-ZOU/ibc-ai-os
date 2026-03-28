'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MousePointer2 } from 'lucide-react'

import { GlobalGlobe } from '@/components/ui/global-globe'

export default function HeroClient({ locale, t }: { locale: string, t: any }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24">
      {/* Dynamic Aurora Glow */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[180px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-amber-600/10 rounded-full blur-[180px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:text-left text-center">
        <div>
          {/* Animated Badge with Neon Ring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-3xl px-6 py-2.5 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:scale-105 transition-transform cursor-default"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-200 text-xs font-black tracking-[0.3em] uppercase">{t.hero.badge}</span>
          </motion.div>

          {/* Shocking Title: Huge, Tight, Gradients */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[7rem] font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            <span className="block mb-4 opacity-95">{t.hero.title}</span>
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-white to-amber-200 inline-block drop-shadow-[0_0_50px_rgba(245,158,11,0.3)]"
            >
              {t.hero.titleHighlight}
            </motion.span>
          </motion.h1>

          {/* Subtitle with better typography */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="max-w-xl lg:mx-0 mx-auto text-xl text-slate-400 mb-12 leading-relaxed font-semibold"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Magnetic Button Design */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap lg:justify-start justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(245, 158, 11, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              href={`/${locale}/onboarding`}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-slate-950 text-lg font-black rounded-2xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.25)]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
              href={`/${locale}/opportunities`}
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 bg-white/5 backdrop-blur-2xl text-white text-lg font-black rounded-2xl transition-all"
            >
              {t.hero.ctaSecondary}
            </motion.a>
          </motion.div>
        </div>

        {/* Globe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="hidden lg:block relative"
        >
          <GlobalGlobe />
        </motion.div>
      </div>
    </section>
  )
}
