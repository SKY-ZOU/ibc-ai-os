import '../globals.css'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { routing } from '@/app/routing'
import Navbar from './_components/navbar'
import Footer from './_components/footer'
import IntlProvider from './_components/intl-provider'

const BASE_URL = 'https://ibcbarter.com'

const META: Record<string, { title: string; description: string; keywords: string }> = {
  'zh-CN': {
    title: 'IBC AI 易货贸易操作系统 - 全球跨境AI易货交易平台',
    description:
      '以中国为核心交易枢纽，AI 驱动全球跨境易货贸易。支持智能匹配、AI 定价、多元结算，帮助企业摆脱美元依赖，实现真实贸易成交闭环。',
    keywords:
      '易货贸易,跨境易货,AI贸易平台,以货易货,国际易货,企业易货,跨境结算,稳定币结算,大宗商品交易,IBC易货',
  },
  en: {
    title: 'IBC AI Trade OS - Global Cross-border AI Barter Trading Platform',
    description:
      'China-centered AI barter trade platform connecting global enterprises. AI-powered matching, pricing & negotiation. Reduce USD dependency with multi-currency settlement.',
    keywords:
      'barter trade,cross-border barter,AI trade platform,international barter,B2B barter,barter exchange,countertrade,barter settlement,commodity trading,IBC barter',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const m = META[locale] ?? META['zh-CN']
  const url = `${BASE_URL}/${locale}`
  const altLocale = locale === 'zh-CN' ? 'en' : 'zh-CN'

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${BASE_URL}/zh-CN`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/zh-CN`,
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: 'IBC AI Trade OS',
      title: m.title,
      description: m.description,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: locale === 'zh-CN' ? 'IBC AI 易货贸易操作系统' : 'IBC AI Trade OS',
        },
      ],
      locale: locale === 'zh-CN' ? 'zh_CN' : 'en_US',
      alternateLocale: altLocale === 'zh-CN' ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
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

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased bg-[#020617] text-white" suppressHydrationWarning>
        <IntlProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-[calc(100vh-73px)]">{children}</main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  )
}
