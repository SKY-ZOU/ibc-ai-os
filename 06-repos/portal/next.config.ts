import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  // Prisma adapter requires serverExternalPackages
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-libsql', '@libsql/client'],
}

export default withNextIntl(nextConfig)
