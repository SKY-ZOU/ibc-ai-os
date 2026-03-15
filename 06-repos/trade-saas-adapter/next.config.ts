import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Prisma adapter requires serverExternalPackages
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-libsql', '@libsql/client'],
}

export default nextConfig
