'use client'

type FieldOption = {
  label: string
  value: string
}

export type FormField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox'
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  step?: string
}

type Props = {
  field: FormField
  value: string | boolean
  onChange: (name: string, value: string | boolean) => void
}

export function FormFieldInput({ field, value, onChange }: Props) {
  const baseClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm'

  if (field.type === 'textarea') {
    return (
      <textarea
        id={field.name}
        required={field.required}
        placeholder={field.placeholder}
        value={String(value)}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`${baseClass} min-h-28`}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <select
        id={field.name}
        required={field.required}
        value={String(value)}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={baseClass}
      >
        <option value="">{field.placeholder || field.label}</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <input
        id={field.name}
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(field.name, event.target.checked)}
        className="h-4 w-4 rounded border-gray-300"
      />
    )
  }

  return (
    <input
      id={field.name}
      type={field.type || 'text'}
      required={field.required}
      placeholder={field.placeholder}
      step={field.step}
      value={String(value)}
      onChange={(event) => onChange(field.name, event.target.value)}
      className={baseClass}
    />
  )
}
