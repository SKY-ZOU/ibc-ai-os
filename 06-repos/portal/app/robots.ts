import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/workspace', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://ibcbarter.com/sitemap.xml',
    host: 'https://ibcbarter.com',
  }
}
