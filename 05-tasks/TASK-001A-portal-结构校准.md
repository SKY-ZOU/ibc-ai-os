# TASK-001A：portal 结构校准报告

## 一、工程版本口径（统一后续各仓）

| 类别 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.1.6 | 最新stable |
| React | 19.2.4 | 随Next.js 16配套 |
| TypeScript | 5.9.3 | |
| Prisma | 7.5.0 | 需配合libsql adapter |
| Tailwind CSS | 4.2.1 | PostCSS方式 |
| Node.js | ≥20 | 本机 v24.11.0 |

## 二、Middleware 路径校准

**发现问题**：
- 原 middleware.ts 已不存在
- 实际使用的是 `proxy.ts`（Next.js 16 新特性）

**当前配置**：
```
proxy.ts  →  next-intl middleware
```

**验证结果**：✅ 重定向正常工作（/ → /zh-CN）

## 三、Prisma Schema 校准

### Phase 1 五张表字段审查

| 表 | 字段数 | 状态 | 备注 |
|----|--------|------|------|
| Enterprise | 15 | ✅ | 含支付偏好、贸易方向 |
| Product | 17 | ✅ | 含HS编码、原产地、交期 |
| Demand | 16 | ✅ | 含交货日、支付偏好、替代品 |
| Opportunity | 11 | ✅ | 标准商机字段 |
| OpportunityMatch | 8 | ✅ | 含AI匹配原因 |

### 字段设计评估
- ✅ 满足 Phase 1 最小闭环（企业入驻→供给→需求）
- ✅ 支持多语言（nameEn, titleEn）
- ✅ 支付偏好、贸易方向等业务字段齐全

## 四、工程规范结论

### 目录结构标准
```
portal/
├── app/
│   ├── [locale]/          # 多语言页面
│   ├── api/               # API Routes
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx           # 根 → 重定向
│   ├── proxy.ts           # ⚠️ Next.js 16: middleware 改名为 proxy
│   └── routing.ts         # next-intl 路由配置
├── lib/
│   └── prisma.ts          # Prisma 客户端
├── messages/              # i18n 消息（简化版）
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── .env
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

### 技术约束
1. **Prisma**: 使用 libsql adapter，`prisma.config.ts` 配置
2. **i18n**: 自定义中间件（不依赖 next-intl 完整功能）
3. **样式**: Tailwind CSS 4 + PostCSS
4. **组件**: 放在 `app/` 内，小文件优先（≤150行）

### 后续各仓参照标准
- 所有新仓使用相同版本
- API 使用 Next.js App Router (Route Handlers)
- 数据库使用 Prisma + libsql
- i18n 参照 portal 简化模式

## 五、待校正问题

| 问题 | 严重度 | 状态 |
|------|--------|------|
| proxy.ts vs middleware.ts 命名 | 低 | 已验证工作 |
| i18n 完整功能未使用 | 低 | 简化版够用 |

## 六、结论

✅ **portal 样板仓结构基本正确，可作为后续各仓参照**

建议：
1. 后续各仓初始化时直接复制 portal 的 package.json 版本
2. i18n 采用简化模式（自定义 middleware + 内联文案）
3. Phase 1 数据模型可直接复用 prisma/schema.prisma
