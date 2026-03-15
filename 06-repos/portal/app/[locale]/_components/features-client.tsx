'use client'

import { motion } from 'framer-motion'

interface FeaturesProps {
  t: any
}

export default function FeaturesClient({ t }: FeaturesProps) {
  return (
    <section className="relative py-32 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((f: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative h-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${f.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.15] transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
