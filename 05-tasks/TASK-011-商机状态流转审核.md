# TASK-011 商机状态流转与审核

## 目标
实现商机状态管理、审核流程、状态变更历史

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)

## 功能清单

### 1. 商机状态管理
- `PATCH /api/opportunities/[id]/stage` — 更新商机阶段
- 阶段：new → matched → negotiating → pending_contract → closed_won / closed_lost

### 2. 审核流程
- `PATCH /api/enterprise/[id]/status` — 审核企业入驻
- 状态：pending → approved / rejected

### 3. 状态变更记录
- `GET /api/audit-log` — 获取操作日志
- 记录所有状态变更操作

## 技术要求
- ai-trade-agent 提供状态变更 API
- Prisma schema 新增 AuditLog 表

## 验收标准
- [ ] 商机阶段可更新
- [ ] 企业状态可审核
- [ ] 变更记录可查询
