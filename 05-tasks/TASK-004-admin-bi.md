# TASK-004: admin-bi 最小骨架

## 任务目标
创建 admin-bi 仓库，作为运营后台与 BI 系统的前端入口。
最低优先级，Phase 1 MVP 阶段仅实现基础骨架。

## 技术规范
- 遵循 `/Volumes/imac/开发项目/IBC-AI-TRADE-OS/06-repos/portal/` 已定的工程标准
- Next.js 16 + Tailwind CSS 4 + next-intl 4 + Prisma v7 + SQLite
- 使用 `libsql` adapter，导出名 `PrismaLibSql`

## 核心模块（Phase 1 MVP - 最低实现）

### 1. 运营工作台（Dashboard）
- 关键指标卡片（入驻企业数、商机数、成交额）
- 简易漏斗图（入驻→发布→匹配→成交）

### 2. 商机池（Opportunity Pool）
- 商机列表（支持筛选、搜索）
- 商机详情查看

### 3. 客户经理台（Account Manager）
- 企业列表
- 企业详情查看

### 4. 审核中心（Review Center）
- 待审核列表（占位）

## 页面路由

```
/dashboard          # 运营工作台
/opportunities     # 商机池
/enterprises       # 企业管理
/reviews           # 审核中心
```

## 数据库模型（Prisma Schema）

- Enterprise（企业）
- Product（供给）
- Demand（需求）
- Opportunity（商机）
- OpportunityMatch（匹配）

*注：Phase 1 直接复用 portal 的 schema，不新增*

## 交付物
1. 完整仓库骨架（参照 portal）
2. 基础页面路由（Dashboard / Opportunities / Enterprises / Reviews）
3. 基础组件（卡片、表格、筛选器）
4. 仓库根目录 README.md
5. 同步更新 `06-repos/` 入口文件

## 完成标准
- [ ] npm run dev 可启动
- [ ] 页面可访问（内容可为占位）
- [ ] 符合 portal 制定的工程规范

---

**调度：** Codex 执行（快速骨架）
**状态：** ⏳ 待启动
**创建时间：** 2026-03-15
