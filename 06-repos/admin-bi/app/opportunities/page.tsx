export default function OpportunitiesPage() {
  const MOCK_OPPORTUNITIES = [
    { id: 'OPP-001', title: '某科技集团 × 东南亚电子元件采购', stage: '匹配中', value: 120000, currency: 'USD', createdAt: '2026-03-14' },
    { id: 'OPP-002', title: '中东建材供应商 × 华南工厂对接', stage: '洽谈中', value: 85000, currency: 'USD', createdAt: '2026-03-13' },
    { id: 'OPP-003', title: '非洲农产品 × 国内食品加工企业', stage: '新建', value: 40000, currency: 'USD', createdAt: '2026-03-12' },
    { id: 'OPP-004', title: '欧洲机械设备 × 中国制造商', stage: '待确认', value: 200000, currency: 'USD', createdAt: '2026-03-11' },
    { id: 'OPP-005', title: '南美矿产 × 国内冶金企业', stage: '成交', value: 350000, currency: 'USD', createdAt: '2026-03-10' },
  ]

  const stageBadge: Record<string, string> = {
    '新建':   'bg-gray-700 text-gray-300',
    '匹配中': 'bg-blue-900 text-blue-300',
    '洽谈中': 'bg-yellow-900 text-yellow-300',
    '待确认': 'bg-purple-900 text-purple-300',
    '成交':   'bg-green-900 text-green-300',
  }

  return (
    <div className="p-8 space-y-6">
      <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">商机池</h1>
          <p className="text-xs text-gray-500 mt-1 font-mono">OPPORTUNITIES · mock data · Phase 1</p>
        </div>
        <button className="px-4 py-1.5 rounded text-xs bg-blue-600 hover:bg-blue-500 text-white font-mono transition-colors">
          + 新建商机
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 flex-wrap">
        {['全部', '新建', '匹配中', '洽谈中', '待确认', '成交'].map((s) => (
          <button
            key={s}
            className="px-3 py-1 rounded text-xs font-mono border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-300 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-xs text-gray-500 uppercase tracking-widest">
              <th className="px-4 py-3 text-left font-mono">ID</th>
              <th className="px-4 py-3 text-left">标题</th>
              <th className="px-4 py-3 text-left">阶段</th>
              <th className="px-4 py-3 text-right font-mono">金额</th>
              <th className="px-4 py-3 text-right font-mono">创建日期</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_OPPORTUNITIES.map((opp) => (
              <tr
                key={opp.id}
                className="border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{opp.id}</td>
                <td className="px-4 py-3 text-gray-200">{opp.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${stageBadge[opp.stage] ?? 'bg-gray-700 text-gray-300'}`}>
                    {opp.stage}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-gray-300">
                  {opp.value.toLocaleString()} {opp.currency}
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-gray-500">{opp.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
