'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard',     label: '仪表盘',   icon: '▦' },
  { href: '/opportunities', label: '商机池',   icon: '◈' },
  { href: '/enterprises',   label: '企业管理', icon: '◉' },
  { href: '/reviews',       label: '审核中心', icon: '◎' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 min-h-screen bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-gray-800">
        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">IBC AI Trade OS</p>
        <p className="text-sm font-semibold text-white mt-0.5">Admin BI</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
              ].join(' ')}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-800">
        <p className="text-xs text-gray-600 font-mono">Phase 1 · Skeleton</p>
      </div>
    </aside>
  )
}
