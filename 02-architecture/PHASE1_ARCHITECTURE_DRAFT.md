# Phase 1 Architecture Draft

## 目标
先跑通商流前台，不直接重做底座。

## 模块范围
1. 国际门户
2. 企业入驻
3. 供给发布
4. 需求发布
5. 企业画像
6. 智能匹配
7. 商机池
8. 人工撮合工作台
9. 转报价/转线索接口

## 新开发 vs 复用
### 新开发
- Portal 前台
- AI 画像与匹配层
- 商机管理层
- 简易人工撮合工作台

### 复用
- 订单/合同/单证/履约（来自 1.0）
- 聚合支付（来自 Kun 路径）
- 供应链金融相关流程（来自 1.0）

## 关键接口
- Portal -> Enterprise Onboarding API
- Demand/Supply -> Matching API
- Opportunity -> CRM / Quotation Adapter
- Opportunity -> Trade SaaS Adapter
