'use client'

import { useState } from 'react'

interface RoleData {
  label: string
  pain: { title: string; items: string[] }
  solution: { title: string; items: string[] }
}

interface Props {
  title: string
  subtitle: string
  roles: RoleData[]
}

export default function SolutionsSection({ title, subtitle, roles }: Props) {
  const [active, setActive] = useState(0)
  const role = roles[active]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{title}</h2>
          <p className="text-slate-500 text-lg">{subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                active === i
                  ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-lg shadow-slate-900/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pain points */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-rose-700 text-base">{role.pain.title}</h3>
            </div>
            <ul className="space-y-3">
              {role.pain.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-rose-800">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* IBC solution */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-emerald-700 text-base">{role.solution.title}</h3>
            </div>
            <ul className="space-y-3">
              {role.solution.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-emerald-800">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
