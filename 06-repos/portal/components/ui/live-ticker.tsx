'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp } from 'lucide-react'

export function LiveTicker({ isZh = true }: { isZh?: boolean }) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    // Mock live data for the ticker
    const mock = [
      { id: 1, text: isZh ? "新商机：来自印度的 5000 吨甲醇已上线" : "New Opp: 5,000 tons of Methanol from India" },
      { id: 2, text: isZh ? "撮合成功：中国机械设备 ↔ 巴西农业集团" : "Matched: China Machinery ↔ Brazil Agri Group" },
      { id: 3, text: isZh ? "新供给：优质精炼铜 Cu 99.9% (智利)" : "New Supply: Refined Copper Cu 99.9% (Chile)" },
      { id: 4, text: isZh ? "实时动态：AI 引擎完成 1,240 次货值验证" : "Real-time: AI completed 1,240 value verifications" },
    ]
    setItems([...mock, ...mock]) // Duplicate for seamless loop
  }, [isZh])

  return (
    <div className="w-full bg-amber-500/5 border-y border-amber-500/10 py-2 overflow-hidden whitespace-nowrap">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 mr-8 shrink-0">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Live
          </span>
        </div>
        
        <div className="flex gap-12 animate-scroll">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Sparkles className="w-3 h-3 text-amber-500/50" />
              <span className="text-[11px] font-medium text-slate-400">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
