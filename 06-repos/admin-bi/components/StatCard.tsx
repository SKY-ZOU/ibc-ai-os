interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'blue' | 'green' | 'yellow' | 'red'
}

const accentMap: Record<NonNullable<StatCardProps['accent']>, string> = {
  blue:   'border-blue-500 text-blue-400',
  green:  'border-green-500 text-green-400',
  yellow: 'border-yellow-500 text-yellow-400',
  red:    'border-red-500 text-red-400',
}

export default function StatCard({ label, value, sub, accent = 'blue' }: StatCardProps) {
  const colors = accentMap[accent]
  return (
    <div className={`bg-gray-800 border-l-4 rounded-sm p-5 flex flex-col gap-1 ${colors}`}>
      <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-3xl font-mono font-bold text-white">{value}</span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </div>
  )
}
