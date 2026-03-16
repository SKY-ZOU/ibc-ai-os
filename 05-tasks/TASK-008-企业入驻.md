# TASK-008 企业入驻

## 目标
实现企业注册/入驻流程，包含基本信息提交、资质认证、状态管理

## 依赖
- portal (前端)
- ai-trade-agent (后端 API)

## 功能清单

### 1. 企业入驻表单
- `GET /api/enterprise/onboarding` — 入驻页面初始化
- `POST /api/enterprise/register` — 企业注册
- `GET /api/enterprise/[enterpriseId]` — 获取企业详情
- `PUT /api/enterprise/[enterpriseId]` — 更新企业信息

### 2. 入驻字段
- 企业名称（必填）
- 统一社会信用代码 / 注册号
- 所在国家/地区
- 行业类别
- 联系人姓名/电话/邮箱
- 企业规模（小型/中型/大型）
- 营业执照上传
- 期望贸易模式（进口/出口/易货）

### 3. 入驻状态
- `pending` 待审核
- `approved` 已通过
- `rejected` 已拒绝

## 页面设计 (Portal)
- `/zh-CN/onboarding` — 入驻首页/表单
- `/zh-CN/enterprise/[id]` — 企业主页（公开）
- `/zh-CN/enterprise/dashboard` — 企业控制台

## 技术要求
- Portal 提供前端页面
- ai-trade-agent 提供企业 API
- Prisma schema: Enterprise 表已存在
- 中英双语支持

## 验收标准
- [ ] 入驻表单可提交
- [ ] 企业列表可查询
- [ ] 入驻状态可更新
- [ ] 企业主页可访问
