'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('Home.footer')
  const navT = useTranslations('Nav')
  const locale = useLocale()
  const isZh = locale === 'zh-CN'

  const sections = [
    {
      title: isZh ? '平台' : 'Platform',
      links: [
        { href: `/${locale}/about`, label: isZh ? '关于我们' : 'About Us' },
        { href: `/${locale}/countries`, label: navT('countries') },
        { href: `/${locale}/opportunities`, label: navT('opportunities') },
      ]
    },
    {
      title: isZh ? '服务' : 'Services',
      links: [
        { href: `/${locale}/supply`, label: navT('supply') },
        { href: `/${locale}/demand`, label: navT('demand') },
        { href: `/${locale}/onboarding`, label: navT('onboarding') },
      ]
    },
    {
      title: isZh ? '法律' : 'Legal',
      links: [
        { href: `/${locale}/privacy`, label: isZh ? '隐私政策' : 'Privacy Policy' },
        { href: `/${locale}/terms`, label: isZh ? '服务条款' : 'Terms of Service' },
      ]
    }
  ]

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-slate-900 font-black text-sm">IBC</span>
              </div>
              <span className="text-white font-bold text-lg">IBC Trade OS</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              {isZh 
                ? '以中国为核心交易枢纽，AI 驱动全球跨境易货贸易，连接全球供需双方。' 
                : 'China-centered AI barter trade platform connecting global buyers and sellers.'}
            </p>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 IBC AI Trade OS. {isZh ? '版权所有' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <div className="text-slate-600 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t('powered')}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs">{t('lang')}:</span>
              <Link href="/zh-CN" className={`text-xs ${locale === 'zh-CN' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>简中</Link>
              <span className="text-white/10">|</span>
              <Link href="/en" className={`text-xs ${locale === 'en' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>EN</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
