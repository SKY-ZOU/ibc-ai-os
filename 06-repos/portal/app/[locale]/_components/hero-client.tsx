'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MousePointer2 } from 'lucide-react'

export default function HeroClient({ locale, t }: { locale: string, t: any }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24">
      {/* Dynamic Aurora Glow */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[180px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-violet-600/20 rounded-full blur-[180px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Animated Badge with Neon Ring */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-3xl px-8 py-3 shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:scale-105 transition-transform cursor-default"
        >
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <span className="text-indigo-200 text-sm font-black tracking-[0.3em] uppercase">{t.hero.badge}</span>
        </motion.div>

        {/* Shocking Title: Huge, Tight, Gradients */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl md:text-[10rem] font-black text-white mb-10 leading-[0.8] tracking-tighter"
        >
          <span className="block mb-6 opacity-95">{t.hero.title}</span>
          <motion.span 
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-white to-violet-500 inline-block drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            {t.hero.titleHighlight}
          </motion.span>
        </motion.h1>

        {/* Subtitle with better typography */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="max-w-3xl mx-auto text-2xl text-slate-400/80 mb-16 leading-relaxed font-semibold"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Magnetic Button Design */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-8 mb-32"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            href={`/${locale}/onboarding`}
            className="group relative inline-flex items-center gap-4 px-14 py-6 bg-white text-slate-950 text-xl font-black rounded-[2rem] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </motion.a>
          <motion.a
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
            href={`/${locale}/supply`}
            className="inline-flex items-center gap-4 px-14 py-6 border border-white/20 bg-white/5 backdrop-blur-2xl text-white text-xl font-black rounded-[2rem] transition-all"
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
