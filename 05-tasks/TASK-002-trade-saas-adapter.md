# TASK-002: trade-saas-adapter 骨架初始化

## 任务目标
基于 Phase 1  MVP 需求，创建 trade-saas-adapter 仓库骨架，采用 contract-first 策略，预留 mock 接口。

## 技术规范
- 遵循 `/Volumes/imac/开发项目/IBC-AI-TRADE-OS/06-repos/portal/` 已定的工程标准
- Next.js 16 + Tailwind CSS 4 + Prisma v7 + SQLite
- 使用 `libsql` adapter，导出名 `PrismaLibSql`
- 目录结构参照 portal，但去除 i18n（非用户Facing）

## 核心模块（Phase 1 MVP）

### 1. 订单模块（Order）
- 订单创建 / 查询 / 状态变更
- 订单关联企业、商品、合同

### 2. 合同模块（Contract）
- 合同模板 / 合同生成 / 签署状态
- 关联订单

### 3. 单证模块（Document）
- 提单 / 发票 / 箱单 / 原产地证
- 关联订单

### 4. 履约模块（Fulfillment）
- 发货 / 收货 / 验收状态
- 物流追踪占位

### 5. 供链金融模块（SupplyChainFinance）
- 融资申请 / 审批状态 / 还款
- 关联订单

## API 路由设计（RESTful）

```
POST   /api/orders              # 创建订单
GET    /api/orders              # 列表查询
GET    /api/orders/:id          # 详情
PATCH  /api/orders/:id          # 状态变更

POST   /api/contracts           # 生成合同
GET    /api/contracts/:id       # 合同详情
PATCH  /api/contracts/:id/status #签署状态

POST   /api/documents           # 创建单证
GET    /api/documents/:id       # 单证详情

POST   /api/fulfillments       # 创建履约记录
GET    /api/fulfillments/:id   # 履约详情

POST   /api/scf/apply          # 融资申请
GET    /api/scf/applications  # 融资列表
```

## 数据库模型（Prisma Schema）

参照 portal 的 schema 风格，设计：
- Order / OrderItem
- Contract / ContractClause
- Document
- Fulfillment / FulfillmentEvent
- SCFApplication

## Mock 策略
- 所有接口默认返回符合 schema 的 mock 数据
- 通过环境变量 `MOCK_MODE=true` 控制
- Mock 数据放在 `/mocks/` 目录

## 交付物
1. 完整仓库骨架（含 package.json, prisma schema, 路由）
2. 所有 Phase 1 API 路由（带 mock 实现）
3. 仓库根目录 README.md（说明技术栈、API 列表）
4. 同步更新 `06-repos/` 入口文件

## 完成标准
- [ ] npm run dev 可启动
- [ ] 所有 API 返回 200（mock 模式）
- [ ] Prisma migrate 可执行
- [ ] 符合 portal 制定的工程规范

---

**调度：** Claude Code 执行
**状态：** ⏳ 待启动
**创建时间：** 2026-03-15
