# TASK-009 供给/需求发布

## 目标
实现企业发布供给和需求信息的功能

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)

## 功能清单

### 1. 供给发布
- `POST /api/supply` — 发布供给
- `GET /api/supply` — 供给列表
- `GET /api/supply/[id]` — 供给详情
- `PUT /api/supply/[id]` — 更新供给
- `DELETE /api/supply/[id]` — 删除供给

### 2. 需求发布
- `POST /api/demand` — 发布需求
- `GET /api/demand` — 需求列表
- `GET /api/demand/[id]` — 需求详情
- `PUT /api/demand/[id]` — 更新需求
- `DELETE /api/demand/[id]` — 删除需求

### 3. 供给/需求字段
- 标题（必填）
- 类型：供给/需求
- 商品类目（农产品/矿产资源/能源化工/机械设备等）
- 数量 + 单位
- 价格区间（最低/最高）
- 货币（USD/CNY/USDT等）
- 产地/目的地
- 质量标准
- 有效期
- 描述
- 图片上传

## 页面设计 (Portal)
- `/zh-CN/supply` — 供给列表
- `/zh-CN/supply/[id]` — 供给详情
- `/zh-CN/demand` — 需求列表
- `/zh-CN/demand/[id]` — 需求详情
- `/zh-CN/supply/create` — 发布供给
- `/zh-CN/demand/create` — 发布需求

## 技术要求
- Portal 提供前端页面
- ai-trade-agent 提供供给/需求 API
- Prisma schema: Product/Demand 表已存在
- 中英双语支持

## 验收标准
- [ ] 供给可发布/编辑/删除
- [ ] 需求可发布/编辑/删除
- [ ] 列表页支持筛选/分页
- [ ] 详情页展示完整信息
