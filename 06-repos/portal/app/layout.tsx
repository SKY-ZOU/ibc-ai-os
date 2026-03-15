import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IBC AI Trade OS',
  description: 'Global Cross-border AI Barter Trading Platform',
}

// Root layout must not define html/body — locale layout owns the shell
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
