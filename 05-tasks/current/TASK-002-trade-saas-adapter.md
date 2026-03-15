# TASK-002：trade-saas-adapter 骨架

## 基本信息
- **执行代理**：Codex（任务边界清晰，适合批量骨架生成）
- **状态**：待执行
- **优先级**：P2（portal 完成后推进）
- **创建**：2026-03-15

---

## 1. 任务目标
用 contract-first + mock 方式构建 trade-saas-adapter 骨架。
不等待 1.0 接口文档，先定义输入输出 schema，先返回 mock，
等 Sky 补充真实接口文档后再接入。

---

## 2. 涉及目录
`/Volumes/imac/开发项目/IBC-AI-TRADE-OS/06-repos/trade-saas-adapter/`

---

## 3. 输入与依赖
- 领域模型：`00-governance/DOMAIN_MODEL.md`（Opportunity / Quotation / Order）
- 工程标准：参照 portal 仓（Next.js 16 + Tailwind + Prisma v7）

---

## 4. 输出文件

```
trade-saas-adapter/
├── app/
│   └── api/
│       ├── lead/
│       │   └── route.ts          # POST /api/lead（商机 → 线索）
│       └── quotation/
│           └── route.ts          # POST /api/quotation（商机 → 报价草稿）
├── lib/
│   └── adapters/
│       └── ibcV1Adapter.ts       # 1.0 接口适配层（当前 mock，占位注释说明待填接口）
├── types/
│   └── index.ts                  # 输入输出 TypeScript 类型定义
├── .env.example
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 5. 接口 Schema 定义

### POST /api/lead
**输入**：
```ts
{
  opportunityId: string
  title: string
  enterpriseId: string
  enterpriseName: string
  category: string
  description?: string
  estimatedValue?: number
  currency?: string
  contactName?: string
  contactEmail?: string
}
```
**输出**：
```ts
{
  success: boolean
  leadId: string        // mock: "MOCK-LEAD-{opportunityId}"
  message: string
  _mock: true           // 标记为 mock 响应
}
```

### POST /api/quotation
**输入**：
```ts
{
  opportunityId: string
  productId?: string
  demandId?: string
  supplierEnterpriseId: string
  buyerEnterpriseId: string
  items: Array<{
    name: string
    quantity: number
    unit: string
    unitPrice: number
    currency: string
  }>
  validDays?: number    // 报价有效天数，默认 30
  notes?: string
}
```
**输出**：
```ts
{
  success: boolean
  quotationId: string   // mock: "MOCK-QUOT-{opportunityId}"
  draftUrl?: string     // mock: null
  message: string
  _mock: true
}
```

---

## 6. 技术约束
- Next.js 16 + App Router（仅 API routes，无前台页面）
- TypeScript strict 模式
- 禁止 shadcn/MUI
- 无数据库（纯适配层，不存储数据）
- 所有 mock 响应必须含 `_mock: true` 字段，方便未来接入真实接口后识别
- 环境变量统一走 `.env.example` 定义

---

## 7. 不可触碰范围
- 不改 portal 仓任何文件
- 不修改 `00-governance/` 任何文档

---

## 8. README 必须包含
1. 项目说明（适配层定位）
2. 本地启动命令
3. 接口说明（/api/lead 和 /api/quotation 的输入输出示例）
4. 待 1.0 提供的接口清单（占位）：
   - `POST /ibc-v1/crm/leads` — 创建线索
   - `POST /ibc-v1/quotations` — 创建报价
   - `GET /ibc-v1/quotations/{id}` — 查询报价
   - `POST /ibc-v1/orders` — 从报价转订单
5. 环境变量说明

---

## 9. 验收标准
- [ ] `npm run dev` 可启动
- [ ] `POST /api/lead` 返回含 `_mock: true` 的 JSON
- [ ] `POST /api/quotation` 返回含 `_mock: true` 的 JSON
- [ ] `types/index.ts` 包含完整输入输出类型
- [ ] `lib/adapters/ibcV1Adapter.ts` 有清晰注释说明待填接口
- [ ] README 包含接口清单和启动命令
- [ ] `.env.example` 已创建
- [ ] `git init` 已初始化

---

## 10. 完成后必须返回
- 目录树
- 已创建文件清单
- 本地启动方式
- 已知问题或待决事项
