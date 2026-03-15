import { redirect } from 'next/navigation'

// proxy.ts already handles / → /zh-CN redirect via next-intl
// keeping explicit redirect as fallback for edge cases
export default function RootPage() {
  redirect('/zh-CN')
}
