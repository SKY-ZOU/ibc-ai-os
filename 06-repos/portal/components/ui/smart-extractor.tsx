'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, Clipboard, Check, X } from 'lucide-react'

interface SmartExtractorProps {
  onExtract: (data: any) => void
  isZh?: boolean
  type: 'supply' | 'demand'
}

export function SmartExtractor({ onExtract, isZh = true, type }: SmartExtractorProps) {
  const [text, setText] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExtract = async () => {
    if (!text.trim()) return
    setIsExtracting(true)
    
    try {
      // Simulate AI extraction logic
      // In real production, this would call /api/ai/extract
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockResult = type === 'supply' ? {
        name: text.slice(0, 20),
        category: '农产品 / Agriculture',
        priceMin: 100,
        priceMax: 200,
        currency: 'USD',
        unit: '吨 MT',
        minQty: 10,
        description: text
      } : {
        title: text.slice(0, 20),
        category: '矿产资源 / Minerals',
        budgetMin: 50000,
        budgetMax: 100000,
        quantity: 1000,
        unit: '吨 MT',
        description: text
      }
      
      onExtract(mockResult)
      setIsExpanded(false)
      setText('')
    } catch (err) {
      console.error('Extraction failed:', err)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="mb-8">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-4 border border-dashed border-amber-500/30 rounded-2xl bg-amber-500/5 hover:bg-amber-500/10 transition-all flex items-center justify-center gap-3 group"
        >
          <Sparkles className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold text-amber-400">
            {isZh ? '使用 AI 智能提取表单信息' : 'Use AI Smart Extraction'}
          </span>
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-amber-500/20 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-white">
                {isZh ? '粘贴需求或产品描述' : 'Paste Demand or Product Description'}
              </h3>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/40 transition-all resize-none mb-4"
            placeholder={isZh ? '例如：我们需要采购5万吨铁矿石，品位62%以上，CIF上海，信用证结算...' : 'e.g. We need to purchase 50,000 tons of iron ore, grade above 62%, CIF Shanghai...'}
          />
          
          <div className="flex gap-3">
            <button
              onClick={handleExtract}
              disabled={isExtracting || !text.trim()}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isZh ? '正在分析提取...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4" />
                  {isZh ? '立即提取' : 'Extract Now'}
                </>
              )}
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
            >
              {isZh ? '取消' : 'Cancel'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
