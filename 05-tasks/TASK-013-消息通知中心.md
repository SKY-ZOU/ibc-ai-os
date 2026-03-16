# TASK-013 消息通知中心

## 目标
实现系统通知、商机提醒、审核消息

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)

## 功能清单

### 1. 消息通知
- `POST /api/notification` — 发送通知
- `GET /api/notification` — 获取通知列表
- `PATCH /api/notification/[id]/read` — 标记已读

### 2. 消息类型
- enterprise_approved — 企业审核通过
- enterprise_rejected — 企业审核拒绝
- opportunity_matched — 商机匹配成功
- quotation_received — 收到新报价
- lead_assigned — 新线索分配

### 3. 消息字段
- 类型
- 标题
- 内容
- 关联实体
- 状态（unread/read）
- 创建时间

## 技术要求
- Prisma schema 新增 Notification 表
- 支持 WebSocket 实时推送（Phase 2）

## 验收标准
- [ ] 通知可发送
- [ ] 通知列表可查看
- [ ] 已读状态可更新
