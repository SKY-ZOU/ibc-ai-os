import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  // Prisma adapter requires serverExternalPackages
  // @libsql/client/web is intentionally NOT listed here so webpack bundles it
  // (the /web variant has no native binaries and is safe to bundle)
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-libsql', '@libsql/client'],
}

export default withNextIntl(nextConfig)
