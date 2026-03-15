import Link from 'next/link'

type Props = {
  locale: string
  labels: {
    home: string
    onboarding: string
    supply: string
    demand: string
  }
}

export function PageNav({ locale, labels }: Props) {
  const links = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/onboarding`, label: labels.onboarding },
    { href: `/${locale}/supply`, label: labels.supply },
    { href: `/${locale}/demand`, label: labels.demand },
  ]

  return (
    <nav className="mb-6 flex flex-wrap gap-3 text-sm text-blue-700">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="rounded-full border border-blue-200 px-3 py-1 hover:bg-blue-50">
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
