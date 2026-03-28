'use client'

import { cn } from '@/lib/utils' // Wait, I need to check if lib/utils exists or create it
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'amber' | 'emerald' | 'indigo' | 'violet' | 'blue' | 'rose' | 'slate' | 'outline'
  size?: 'xs' | 'sm' | 'md'
  animate?: boolean
}

export function Badge({ 
  children, 
  className, 
  variant = 'default', 
  size = 'sm',
  animate = false 
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-slate-300 border-white/10',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    outline: 'bg-transparent text-slate-400 border-white/5',
  }

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[9px]',
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span className={cn(
      'inline-flex items-center font-bold uppercase tracking-wider border rounded-lg transition-all',
      variants[variant],
      sizes[size],
      animate && 'animate-pulse',
      className
    )}>
      {children}
    </span>
  )
}
