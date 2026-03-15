export default function ReviewsPage() {
  const MOCK_REVIEWS = [
    { id: 'REV-001', type: '企业入驻', subject: '非洲农业联盟', submittedAt: '2026-03-08 14:30', priority: 'normal' },
    { id: 'REV-002', type: '企业入驻', subject: '中东建材国际', submittedAt: '2026-03-01 09:15', priority: 'high' },
    { id: 'REV-003', type: '供给发布', subject: '鑫创科技 — 精密电阻器 B2000', submittedAt: '2026-03-14 16:45', priority: 'normal' },
    { id: 'REV-004', type: '需求发布', subject: 'SEA Trade — 东南亚食品原料采购', submittedAt: '2026-03-15 08:00', priority: 'normal' },
  ]

  const priorityBadge: Record<string, string> = {
    high:   'bg-red-900 text-red-300',
    normal: 'bg-gray-700 text-gray-400',
  }
  const priorityLabel: Record<string, string> = {
    high: '紧急', normal: '普通',
  }
  const typeBadge: Record<string, string> = {
    '企业入驻': 'bg-blue-900 text-blue-300',
    '供给发布': 'bg-purple-900 text-purple-300',
    '需求发布': 'bg-yellow-900 text-yellow-300',
  }

  return (
    <div className="p-8 space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-xl font-semibold text-white">审核中心</h1>
        <p className="text-xs text-gray-500 mt-1 font-mono">REVIEWS · mock data · Phase 1 · 占位页</p>
      </div>

      {/* Pending banner */}
      <div className="bg-yellow-950 border border-yellow-800 rounded p-4 flex items-center gap-3">
        <span className="text-yellow-400 text-lg">⚠</span>
        <div>
          <div className="text-yellow-300 text-sm font-semibold">待审核 4 条</div>
          <div className="text-yellow-600 text-xs font-mono mt-0.5">Phase 2 将接入工作流引擎，当前为占位列表</div>
        </div>
      </div>

      {/* Review list */}
      <div className="bg-gray-800 rounded border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-xs text-gray-500 uppercase tracking-widest">
              <th className="px-4 py-3 text-left font-mono">ID</th>
              <th className="px-4 py-3 text-left">类型</th>
              <th className="px-4 py-3 text-left">主体</th>
              <th className="px-4 py-3 text-left">优先级</th>
              <th className="px-4 py-3 text-right font-mono">提交时间</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REVIEWS.map((rev) => (
              <tr
                key={rev.id}
                className="border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{rev.id}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${typeBadge[rev.type] ?? 'bg-gray-700 text-gray-300'}`}>
                    {rev.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-200">{rev.subject}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${priorityBadge[rev.priority] ?? 'bg-gray-700 text-gray-300'}`}>
                    {priorityLabel[rev.priority] ?? rev.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-gray-500">{rev.submittedAt}</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 text-xs rounded bg-green-800 hover:bg-green-700 text-green-200 font-mono mr-2 transition-colors">
                    通过
                  </button>
                  <button className="px-3 py-1 text-xs rounded bg-red-900 hover:bg-red-800 text-red-300 font-mono transition-colors">
                    拒绝
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
