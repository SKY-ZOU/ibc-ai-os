'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950/20 rounded-full animate-pulse border border-white/5" />
})

export function GlobalGlobe() {
  const globeRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for arcs (trading routes)
  const arcsData = useMemo(() => {
    const N = 20
    return [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#f59e0b', '#fbbf24', '#ffffff'][Math.round(Math.random() * 2)]
    }))
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto group">
      {/* Background glow behind globe */}
      <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
      
      <div className="relative z-10 w-full h-full pointer-events-none md:pointer-events-auto">
        <Globe
          ref={globeRef}
          width={500}
          height={500}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={4}
          arcDashAnimateTime={() => Math.random() * 4000 + 2000}
          arcStroke={0.5}
          atmosphereColor="#f59e0b"
          atmosphereAltitude={0.15}
          onGlobeReady={() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true
              globeRef.current.controls().autoRotateSpeed = 0.5
              globeRef.current.controls().enableZoom = false
            }
          }}
        />
      </div>

      {/* Floating UI Badges around globe */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="absolute top-1/4 -left-4 z-20 bg-slate-900/80 backdrop-blur-md border border-amber-500/20 px-3 py-2 rounded-xl shadow-xl shadow-black/50"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">China ↔ Africa</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-1/4 -right-4 z-20 bg-slate-900/80 backdrop-blur-md border border-amber-500/20 px-3 py-2 rounded-xl shadow-xl shadow-black/50"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Trade Matched</span>
        </div>
      </motion.div>
    </div>
  )
}
