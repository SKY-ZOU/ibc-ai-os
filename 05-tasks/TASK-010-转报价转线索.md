# TASK-010 转报价/转线索

## 目标
实现商机转报价单、线索分发功能

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)
- trade-saas-adapter (原有系统对接)

## 功能清单

### 1. 转报价
- `POST /api/quotation/create` — 将商机转为正式报价单
- `GET /api/quotation/[id]` — 获取报价单详情
- `PUT /api/quotation/[id]` — 更新报价单
- 报价单包含：双方企业信息、商品明细、价格、数量、有效期、条款

### 2. 转线索
- `POST /api/lead/distribute` — 将商机分发给其他企业
- `GET /api/lead/[id]` — 获取线索详情
- `PUT /api/lead/[id]/status` — 更新线索状态
- 线索状态：new / contacted / interested / not_interested / converted

### 3. 报价单字段
- 报价单号（自动生成）
- 买方企业
- 卖方企业
- 商品列表（名称/数量/单价/总价）
- 货币
- 有效期
- 支付条款
- 物流条款
- 状态（draft/sent/accepted/rejected）

### 4. 线索字段
- 来源商机ID
- 分发目标企业ID
- 状态
- 备注
- 创建时间/更新时间

## 页面设计 (Portal)
- `/zh-CN/quotation/[id]` — 报价单详情
- `/zh-CN/lead` — 线索管理

## 技术要求
- Portal 提供前端页面
- ai-trade-agent 提供报价/线索 API
- trade-saas-adapter 提供底层数据存储
- 中英双语支持

## 验收标准
- [ ] 商机可转为报价单
- [ ] 报价单可查看/编辑
- [ ] 线索可分发给其他企业
- [ ] 线索状态可更新
