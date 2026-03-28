'use client'

import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  glow?: boolean
  glowColor?: string
  variant?: 'default' | 'amber' | 'indigo' | 'slate' | 'transparent'
}

export function Card({ 
  children, 
  className, 
  glow = false, 
  glowColor = 'amber', 
  variant = 'default',
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-white/[0.03] border-white/5',
    amber: 'bg-amber-500/[0.03] border-amber-500/10',
    indigo: 'bg-indigo-500/[0.03] border-indigo-500/10',
    slate: 'bg-slate-500/[0.03] border-slate-500/10',
    transparent: 'bg-transparent border-white/5',
  }

  const glowStyles = {
    amber: 'group-hover:border-amber-500/30 group-hover:bg-amber-500/[0.05] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.05)]',
    indigo: 'group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.05] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.05)]',
    slate: 'group-hover:border-slate-500/30 group-hover:bg-slate-500/[0.05]',
  }

  return (
    <motion.div
      className={cn(
        'group relative border rounded-3xl p-6 transition-all duration-500',
        variants[variant],
        glow && glowStyles[glowColor as keyof typeof glowStyles],
        className
      )}
      {...props}
    >
      {/* Subtle Noise Texture */}
      {glow && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[inherit] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      )}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  )
}
