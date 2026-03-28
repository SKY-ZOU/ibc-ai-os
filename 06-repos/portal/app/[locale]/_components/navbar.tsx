'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiveTicker } from '@/components/ui/live-ticker'

export default function Navbar() {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/countries`, label: t('countries') },
    { href: `/${locale}/opportunities`, label: t('opportunities'), highlight: true },
    { href: `/${locale}/supply`, label: t('supply') },
    { href: `/${locale}/demand`, label: t('demand') },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Main Nav */}
      <div className="border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:justify-start md:gap-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-slate-900 font-black text-sm">IBC</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-none">IBC Trade OS</div>
                  <div className="text-amber-400/60 text-[10px] tracking-widest uppercase mt-0.5">Global AI Barter</div>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    link.highlight ? 'text-amber-400 hover:text-amber-300' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-4">
              <div className="flex items-center gap-0.5 border border-white/10 rounded-lg overflow-hidden bg-white/5 p-0.5">
                <Link 
                  href="/zh-CN" 
                  className={`px-2 py-1 rounded-md text-[10px] transition-all ${
                    locale === 'zh-CN' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  简
                </Link>
                <Link 
                  href="/en" 
                  className={`px-2 py-1 rounded-md text-[10px] transition-all ${
                    locale === 'en' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </Link>
              </div>

              <Link
                href={`/${locale}/onboarding`}
                className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 transition-all shadow-amber-500/20"
              >
                {t('onboarding')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <Link
                    href={`/${locale}/onboarding`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center px-4 py-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-slate-900 bg-amber-500"
                  >
                    {t('onboarding')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Ticker Strip */}
      <LiveTicker isZh={locale === 'zh-CN'} />
    </header>
  )
}
