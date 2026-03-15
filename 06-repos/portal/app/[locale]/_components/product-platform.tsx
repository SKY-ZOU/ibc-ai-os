'use client'

import { useState } from 'react'

interface Product {
  id: string
  name: string
  tagline: string
  desc: string
  highlights: string[]
  badge?: string
}

interface Props {
  title: string
  subtitle: string
  products: Product[]
  labelDetails: string
}

export default function ProductPlatform({ title, subtitle, products, labelDetails }: Props) {
  const [active, setActive] = useState(0)
  const product = products[active]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{title}</h2>
          <p className="text-slate-500 text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: product list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {products.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`group w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 ${
                  active === i
                    ? 'bg-[#0f172a] border-[#0f172a] shadow-xl shadow-slate-900/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-bold text-sm mb-0.5 ${active === i ? 'text-white' : 'text-[#0f172a]'}`}>
                      {p.name}
                    </div>
                    <div className={`text-xs ${active === i ? 'text-slate-400' : 'text-slate-500'}`}>
                      {p.tagline}
                    </div>
                  </div>
                  {p.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      active === i ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {p.badge}
                    </span>
                  )}
                  <svg
                    className={`w-4 h-4 shrink-0 ml-3 transition-transform ${active === i ? 'text-amber-400 translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Right: product detail */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 p-10 h-full">
              <div className="mb-2">
                {product.badge && (
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 mb-4">
                    {product.badge}
                  </span>
                )}
                <h3 className="text-2xl font-black text-[#0f172a] mb-2">{product.name}</h3>
                <p className="text-amber-600 font-semibold text-sm mb-4">{product.tagline}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{product.desc}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{labelDetails}</div>
                <ul className="space-y-3">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
