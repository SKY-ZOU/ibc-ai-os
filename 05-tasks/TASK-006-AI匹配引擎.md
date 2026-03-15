# TASK-006 AI 匹配引擎

## 目标
实现企业画像生成 + 供需智能匹配 + 商机评分功能

## 依赖
- ai-trade-agent (已存在)
- portal (已存在)

## 功能清单

### 1. 企业画像 API
- `POST /api/profile/generate` — 基于企业基本信息生成 AI 画像
- `GET /api/profile/[enterpriseId]` — 获取企业画像详情
- 画像包含：行业标签、规模评级、信用评分、贸易偏好、供需匹配度

### 2. 智能匹配 API
- `POST /api/match` — 单次匹配（供给 ↔ 需求）
- `GET /api/matching/supply-demand` — 供需列表匹配
- `GET /api/matching/score` — 商机匹配度评分

### 3. 匹配算法
- 基于商品类目、数量规模、目标价格区间、物流偏好
- 返回匹配度分数 (0-100) + 匹配原因

## 技术要求
- ai-trade-agent 提供 API 服务
- 使用现有 Prisma schema (Enterprise, Product, Demand, Opportunity)
- 中英双语支持

## 验收标准
- [ ] profile 生成接口可调用
- [ ] match 接口返回匹配结果 + 分数
- [ ] 单元测试通过
- [ ] API 文档可用
