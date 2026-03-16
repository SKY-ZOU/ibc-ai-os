import type { MetadataRoute } from 'next'

const BASE_URL = 'https://ibcbarter.com'
const locales = ['zh-CN', 'en'] as const

// Public-facing pages (no login required)
const publicRoutes = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/onboarding', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/countries', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/opportunities', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/supply', priority: 0.7, changeFrequency: 'daily' as const },
  { path: '/demand', priority: 0.7, changeFrequency: 'daily' as const },
  { path: '/catalog', priority: 0.7, changeFrequency: 'weekly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of publicRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
          ),
        },
      })
    }
  }

  return entries
}
