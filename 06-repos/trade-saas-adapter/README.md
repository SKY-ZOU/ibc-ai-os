# ibc-trade-saas-adapter

IBC AI Trade OS — 交易履约中台适配层

对接现有 1.0 交易履约中台的适配层。
当前为 contract-first mock 模式，所有接口返回模拟数据（`_mock: true`），
待 1.0 接口文档就绪后逐步替换为真实调用。

---

## 本地启动

```bash
npm install
cp .env.example .env.local
npm run dev
# 服务运行于 http://localhost:3002
```

健康检查：
```bash
curl http://localhost:3002/api/health
```

---

## 接口说明

### POST /api/lead — 商机转线索

**请求示例**：
```json
{
  "opportunityId": "OPP-001",
  "title": "钢材出口意向",
  "enterpriseId": "ENT-123",
  "enterpriseName": "示例贸易有限公司",
  "category": "金属材料",
  "estimatedValue": 500000,
  "currency": "USD",
  "contactName": "张三",
  "contactEmail": "zhangsan@example.com"
}
```

**响应示例**：
```json
{
  "success": true,
  "leadId": "MOCK-LEAD-OPP-001",
  "message": "[MOCK] 线索已创建",
  "_mock": true
}
```

---

### POST /api/quotation — 商机转报价草稿

**请求示例**：
```json
{
  "opportunityId": "OPP-001",
  "supplierEnterpriseId": "ENT-456",
  "buyerEnterpriseId": "ENT-123",
  "items": [
    {
      "name": "Q235 热轧卷板",
      "quantity": 100,
      "unit": "吨",
      "unitPrice": 4500,
      "currency": "CNY"
    }
  ],
  "validDays": 30,
  "notes": "含运费至目的港"
}
```

**响应示例**：
```json
{
  "success": true,
  "quotationId": "MOCK-QUOT-OPP-001",
  "draftUrl": null,
  "message": "[MOCK] 报价草稿已创建",
  "_mock": true
}
```

---

## 待 1.0 提供的接口清单

| 本层方法 | 对应 1.0 接口 | 状态 |
|---------|--------------|------|
| createLead() | POST /ibc-v1/crm/leads | 待接入 |
| createQuotation() | POST /ibc-v1/quotations | 待接入 |
| getQuotation() | GET /ibc-v1/quotations/{id} | 待接入 |
| createOrder() | POST /ibc-v1/orders（报价转订单）| 待接入 |

接入时修改 `lib/adapters/ibcV1Adapter.ts`，取消注释 `ibcPost` 工具函数，
替换对应方法体，删除 `_mock: true` 字段。

---

## 环境变量

| 变量 | 说明 |
|------|------|
| `IBC_V1_BASE_URL` | 1.0 接口 base URL |
| `IBC_V1_API_KEY` | 1.0 接口认证 key |

---

## 技术约束

- Next.js 16 + App Router（仅 API routes，无前台页面）
- TypeScript strict 模式
- 无数据库（纯适配层，不存储数据）
- 端口 3002（避免与 portal:3000 冲突）
