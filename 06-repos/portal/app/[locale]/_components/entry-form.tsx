'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FormFieldInput, type FormField } from './form-fields'

type Props = {
  action: '/api/enterprise' | '/api/supply' | '/api/demand'
  namespace: 'OnboardingPage' | 'SupplyPage' | 'DemandPage'
  fields: FormField[]
}

type MessageState = {
  type: 'success' | 'error'
  text: string
}

export function EntryForm({ action, namespace, fields }: Props) {
  const t = useTranslations(namespace)
  const [values, setValues] = useState<Record<string, string | boolean>>(
    Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? false : '']))
  )
  const [message, setMessage] = useState<MessageState | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateValue(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || t('messages.submitFailed'))
      }

      setMessage({
        type: 'success',
        text: `${t('messages.submitSuccess')} ${t('messages.recordId')}: ${result.data.id}`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : t('messages.submitFailed'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {fields.map((field) => (
        <label
          key={field.name}
          htmlFor={field.name}
          className={`block text-sm font-medium text-gray-700 ${field.type === 'checkbox' ? 'flex items-center gap-3' : ''}`}
        >
          <span>{field.label}{field.required ? ' *' : ''}</span>
          <FormFieldInput field={field} value={values[field.name]} onChange={updateValue} />
        </label>
      ))}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? t('submitLoading') : t('submit')}
      </button>

      {message ? (
        <p className={message.type === 'success' ? 'text-sm text-green-700' : 'text-sm text-red-600'}>
          {message.text}
        </p>
      ) : null}
    </form>
  )
}
