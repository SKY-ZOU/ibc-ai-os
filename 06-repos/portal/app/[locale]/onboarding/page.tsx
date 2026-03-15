import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { EntryForm } from '../_components/entry-form'
import { PageNav } from '../_components/page-nav'

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('OnboardingPage')
  const nav = await getTranslations('EntryNav')

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <PageNav locale={locale} labels={{ home: nav('home'), onboarding: nav('onboarding'), supply: nav('supply'), demand: nav('demand') }} />
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t('description')}</p>
        <NextIntlClientProvider>
          <EntryForm
            action="/api/enterprise"
            namespace="OnboardingPage"
            fields={[
              { name: 'name', label: t('fields.name'), required: true },
              { name: 'nameEn', label: t('fields.nameEn') },
              { name: 'industry', label: t('fields.industry') },
              { name: 'country', label: t('fields.country'), required: true },
              { name: 'city', label: t('fields.city') },
              { name: 'email', label: t('fields.email'), type: 'email' },
              { name: 'phone', label: t('fields.phone') },
              { name: 'contactName', label: t('fields.contactName') },
              { name: 'website', label: t('fields.website') },
              { name: 'paymentPreference', label: t('fields.paymentPreference') },
              {
                name: 'tradeDirection',
                label: t('fields.tradeDirection'),
                type: 'select',
                placeholder: t('placeholders.tradeDirection'),
                options: ['export', 'import', 'both'].map((value) => ({ value, label: t(`options.tradeDirection.${value}`) })),
              },
              { name: 'description', label: t('fields.description'), type: 'textarea' },
            ]}
          />
        </NextIntlClientProvider>
      </div>
    </main>
  )
}
