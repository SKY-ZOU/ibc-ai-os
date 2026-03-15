import StatCard from '@/components/StatCard'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-xl font-semibold text-white">BI 驾驶舱</h1>
        <p className="text-xs text-gray-500 mt-1 font-mono">DASHBOARD · mock data · Phase 1</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="商机总数"
          value={128}
          sub="累计录入"
          accent="blue"
        />
        <StatCard
          label="本周新增"
          value={23}
          sub="较上周 +4"
          accent="green"
        />
        <StatCard
          label="已转线索"
          value={45}
          sub="进入跟进阶段"
          accent="yellow"
        />
        <StatCard
          label="转化率"
          value="35%"
          sub="商机 → 线索"
          accent="red"
        />
      </div>

      {/* Placeholder chart area */}
      <div className="bg-gray-800 rounded border border-gray-700 p-6 h-64 flex items-center justify-center">
        <p className="text-gray-500 text-sm font-mono">[ 图表区域 · 待接入真实数据 ]</p>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-gray-800 rounded border border-gray-700 p-5">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">最近动态</h2>
        <ul className="space-y-2 text-sm text-gray-400 font-mono">
          {[
            '2026-03-15 10:42  客户经理 Alice 录入新商机 #128 — 某科技集团',
            '2026-03-15 09:18  商机 #115 状态变更 → 已转线索',
            '2026-03-14 16:55  商机 #102 补充尽调资料',
            '2026-03-14 11:30  系统自动标记 3 条超期商机',
          ].map((item, i) => (
            <li key={i} className="border-b border-gray-700 pb-2 last:border-0 last:pb-0">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
