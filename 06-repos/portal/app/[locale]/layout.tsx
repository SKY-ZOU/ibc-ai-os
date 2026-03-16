import '../globals.css'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { routing } from '@/app/routing'

export const metadata: Metadata = {
  title: 'IBC AI Trade OS - Global Cross-border AI Barter Trading Platform',
  description: 'AI-powered global trade platform connecting enterprises worldwide',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#020617',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'zh-CN' | 'en')) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  )
}
