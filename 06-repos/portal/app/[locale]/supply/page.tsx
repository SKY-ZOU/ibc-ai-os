import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { EntryForm } from '../_components/entry-form'
import { PageNav } from '../_components/page-nav'

export default async function SupplyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('SupplyPage')
  const nav = await getTranslations('EntryNav')

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <PageNav locale={locale} labels={{ home: nav('home'), onboarding: nav('onboarding'), supply: nav('supply'), demand: nav('demand') }} />
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 mb-6 text-sm text-gray-600">{t('description')}</p>
        <NextIntlClientProvider>
          <EntryForm
            action="/api/supply"
            namespace="SupplyPage"
            fields={[
              { name: 'enterpriseId', label: t('fields.enterpriseId'), required: true },
              { name: 'name', label: t('fields.name'), required: true },
              { name: 'category', label: t('fields.category'), required: true },
              { name: 'description', label: t('fields.description'), type: 'textarea' },
              { name: 'priceMin', label: t('fields.priceMin'), type: 'number', step: '0.01' },
              { name: 'priceMax', label: t('fields.priceMax'), type: 'number', step: '0.01' },
              {
                name: 'currency',
                label: t('fields.currency'),
                type: 'select',
                options: [
                  { value: 'USD', label: 'USD' },
                  { value: 'CNY', label: 'CNY' },
                  { value: 'EUR', label: 'EUR' },
                ],
              },
              { name: 'unit', label: t('fields.unit') },
              { name: 'minQty', label: t('fields.minQty'), type: 'number' },
              { name: 'leadTime', label: t('fields.leadTime'), type: 'number' },
              { name: 'hsCode', label: t('fields.hsCode') },
              { name: 'origin', label: t('fields.origin') },
            ]}
          />
        </NextIntlClientProvider>
      </div>
    </main>
  )
}
