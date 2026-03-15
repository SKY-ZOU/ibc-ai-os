export default function EnterprisesPage() {
  const MOCK_ENTERPRISES = [
    { id: 'ENT-001', name: '鑫创科技有限公司', nameEn: 'XinChuang Tech Ltd.', country: '中国', industry: '电子制造', status: 'active', createdAt: '2026-02-10' },
    { id: 'ENT-002', name: '东南亚贸易集团', nameEn: 'SEA Trade Group', country: '新加坡', industry: '贸易流通', status: 'active', createdAt: '2026-02-18' },
    { id: 'ENT-003', name: '中东建材国际', nameEn: 'ME Building Materials Intl.', country: '阿联酋', industry: '建筑材料', status: 'pending', createdAt: '2026-03-01' },
    { id: 'ENT-004', name: '非洲农业联盟', nameEn: 'Africa Agri Alliance', country: '肯尼亚', industry: '农业', status: 'pending', createdAt: '2026-03-08' },
    { id: 'ENT-005', name: '欧洲精密机械', nameEn: 'EU Precision Machinery GmbH', country: '德国', industry: '机械设备', status: 'active', createdAt: '2026-03-12' },
  ]

  const statusBadge: Record<string, string> = {
    active:  'bg-green-900 text-green-300',
    pending: 'bg-yellow-900 text-yellow-300',
    rejected:'bg-red-900 text-red-300',
  }
  const statusLabel: Record<string, string> = {
    active: '已入驻', pending: '待审核', rejected: '已拒绝',
  }

  return (
    <div className="p-8 space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-xl font-semibold text-white">企业管理</h1>
        <p className="text-xs text-gray-500 mt-1 font-mono">ENTERPRISES · mock data · Phase 1</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '入驻企业', value: 3, color: 'text-green-400' },
          { label: '待审核', value: 2, color: 'text-yellow-400' },
          { label: '本月新增', value: 4, color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-gray-800 rounded border border-gray-700 p-4 text-center">
            <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-xs text-gray-500 uppercase tracking-widest">
              <th className="px-4 py-3 text-left font-mono">ID</th>
              <th className="px-4 py-3 text-left">企业名称</th>
              <th className="px-4 py-3 text-left">国家</th>
              <th className="px-4 py-3 text-left">行业</th>
              <th className="px-4 py-3 text-left">状态</th>
              <th className="px-4 py-3 text-right font-mono">入驻日期</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ENTERPRISES.map((ent) => (
              <tr
                key={ent.id}
                className="border-b border-gray-700 last:border-0 hover:bg-gray-750 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{ent.id}</td>
                <td className="px-4 py-3">
                  <div className="text-gray-200">{ent.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{ent.nameEn}</div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{ent.country}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{ent.industry}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${statusBadge[ent.status] ?? 'bg-gray-700 text-gray-300'}`}>
                    {statusLabel[ent.status] ?? ent.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-xs text-gray-500">{ent.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
