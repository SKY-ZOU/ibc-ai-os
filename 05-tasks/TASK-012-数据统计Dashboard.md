# TASK-012 数据统计与 Dashboard

## 目标
实现平台数据统计、企业管理后台

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)

## 功能清单

### 1. 平台统计
- `GET /api/stats/overview` — 平台核心指标
- 指标：企业数、供给数、需求数、商机数、成交金额

### 2. 企业管理
- `GET /api/admin/enterprises` — 企业管理列表
- `PATCH /api/admin/enterprises/[id]` — 企业审核

### 3. 数据看板
- 每日新增趋势
- 行业分布
- 国家分布
- 成交漏斗

## 技术要求
- Portal 提供管理后台页面
- ai-trade-agent 提供统计 API

## 验收标准
- [ ] 平台统计可查看
- [ ] 企业管理可操作
- [ ] 数据可视化
