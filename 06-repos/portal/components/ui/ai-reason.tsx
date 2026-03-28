'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Info, X } from 'lucide-react'
import { useState } from 'react'

interface AIReasonProps {
  reason: string
  score: number
  isZh?: boolean
}

export function AIReason({ reason, score, isZh = true }: AIReasonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-emerald-400'
    if (s >= 80) return 'text-blue-400'
    return 'text-amber-400'
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all group"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span className={`text-[10px] font-black font-mono ${getScoreColor(score)}`}>AI {score}%</span>
        <Info className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-full left-0 mb-3 z-50 w-72 p-5 bg-slate-900 border border-amber-500/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                      {isZh ? 'AI 匹配分析' : 'AI Match Analysis'}
                    </span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <span className={`text-3xl font-black font-mono ${getScoreColor(score)}`}>{score}%</span>
                    <span className="text-slate-500 text-[10px] mb-1 uppercase font-bold tracking-wider">
                      {isZh ? '匹配可信度' : 'Match Confidence'}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      " {reason} "
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      {isZh ? '数据已通过货值验证' : 'Data Verified by AI'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
