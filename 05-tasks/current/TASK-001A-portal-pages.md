# TASK-001A | portal Phase 1 基础页面

## 任务目标
在 portal 仓内实现三个最小可用数据入口页面：
企业入驻（onboarding）/ 供给发布（supply）/ 需求发布（demand）
形成：首页 → 入驻 → 供给/需求发布 → 数据入库 的闭环。

## 涉及目录
```
/Volumes/imac/开发项目/IBC-AI-TRADE-OS/06-repos/portal/
  app/[locale]/
    onboarding/page.tsx       ← 新建
    supply/page.tsx           ← 新建
    demand/page.tsx           ← 新建
  app/api/
    enterprise/route.ts       ← 新建
    supply/route.ts           ← 新建
    demand/route.ts           ← 新建
  messages/
    zh-CN.json                ← 追加翻译 key
    en.json                   ← 追加翻译 key
  README.md                   ← 追加页面与接口说明
```

## 输入与依赖
- Prisma client: `lib/prisma.ts` (import from '@prisma/client')
- Schema 已定义：Enterprise / Product / Demand（已 db push）
- 路由配置：app/routing.ts (locales: ['zh-CN', 'en'])

## 输出文件（精确）
1. `app/[locale]/onboarding/page.tsx` — 企业入驻表单页
2. `app/[locale]/supply/page.tsx` — 供给发布表单页
3. `app/[locale]/demand/page.tsx` — 需求发布表单页
4. `app/api/enterprise/route.ts` — POST，创建 Enterprise
5. `app/api/supply/route.ts` — POST，创建 Product
6. `app/api/demand/route.ts` — POST，创建 Demand
7. `messages/zh-CN.json` — 追加三个页面的翻译 key
8. `messages/en.json` — 追加三个页面的翻译 key
9. `README.md` — 追加页面与 API 说明

## API 接口规范

### POST /api/enterprise
Request Body:
```json
{
  "name": "string (required)",
  "nameEn": "string?",
  "industry": "string?",
  "country": "string (required)",
  "city": "string?",
  "email": "string?",
  "phone": "string?",
  "contactName": "string?",
  "description": "string?",
  "website": "string?",
  "paymentPreference": "string?",
  "tradeDirection": "export|import|both (optional)"
}
```
Response:
```json
{ "success": true, "data": { "id": "...", "name": "..." } }
{ "success": false, "error": "string" }
```

### POST /api/supply
Request Body:
```json
{
  "enterpriseId": "string (required)",
  "name": "string (required)",
  "category": "string (required)",
  "description": "string?",
  "priceMin": "number?",
  "priceMax": "number?",
  "currency": "string default USD",
  "unit": "string?",
  "minQty": "number?",
  "leadTime": "number? (天)",
  "hsCode": "string?",
  "origin": "string?"
}
```
Response: 同上格式

### POST /api/demand
Request Body:
```json
{
  "enterpriseId": "string (required)",
  "title": "string (required)",
  "category": "string (required)",
  "description": "string?",
  "budgetMin": "number?",
  "budgetMax": "number?",
  "currency": "string default USD",
  "quantity": "number?",
  "unit": "string?",
  "deliveryLocation": "string?",
  "paymentPreference": "string?",
  "acceptAlternative": "boolean default false"
}
```
Response: 同上格式

## 技术约束
- 框架：Next.js 16 + React 19 + TypeScript
- 样式：Tailwind CSS 4 only，禁止 shadcn/MUI/Radix
- 国际化：使用 next-intl useTranslations hook（需要在 'use client' 组件中），
  Server Component 用 getTranslations from 'next-intl/server'
- Prisma：import { prisma } from '@/lib/prisma'，只在 Server Component / API route 中使用，
  不在 'use client' 组件中直接 import
- 组件 ≤ 150 行，超过则拆分
- API route 必须做基础 input validation（required 字段检查）
- 错误处理：try/catch，返回 { success: false, error: message }

## 页面设计要求
- 先可用，不追求美观
- 每个页面：标题 + 简单表单 + 提交按钮 + 成功/失败提示
- 成功后显示：「提交成功，记录ID：xxx」
- 失败后显示：错误原因
- 表单字段对应 API required 字段必填，optional 字段可选
- 页面顶部加简单导航链接：首页 / 入驻 / 供给 / 需求

## 不可触碰范围
- prisma/schema.prisma — 不修改
- prisma.config.ts — 不修改
- lib/prisma.ts — 不修改
- app/routing.ts — 不修改
- app/layout.tsx — 不修改
- app/[locale]/layout.tsx — 不修改
- proxy.ts — 不修改
- i18n.ts — 不修改
- next.config.ts — 不修改

## 验收标准
1. npm run dev 无报错启动
2. /zh-CN/onboarding 可访问，表单可提交，入库成功返回 ID
3. /zh-CN/supply 可访问，表单可提交，入库成功返回 ID
4. /zh-CN/demand 可访问，表单可提交，入库成功返回 ID
5. /en/onboarding、/en/supply、/en/demand 同上（英文界面）
6. POST /api/enterprise、/api/supply、/api/demand 返回正确 JSON
7. 缺少 required 字段时返回 { success: false, error: "..." }

## 完成后必须返回
1. 已创建/修改文件清单
2. 每个 API 的 curl 测试命令
3. 已知问题与风险点
4. 下一步建议
