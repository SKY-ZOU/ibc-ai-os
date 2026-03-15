# TASK-003: ai-trade-agent 初始化

## 任务目标
创建 ai-trade-agent 仓库，作为 AI 商流中台的核心引擎。
采用 provider adapter 模式，支持多模型供应商切换。

## 技术规范
- 遵循 `/Volumes/imac/开发项目/IBC-AI-TRADE-OS/06-repos/portal/` 已定的工程标准
- Next.js 16 + Tailwind CSS 4 + Prisma v7 + SQLite
- 使用 `libsql` adapter，导出名 `PrismaLibSql`
- 目录结构参照 portal

## 核心模块（Phase 1 MVP）

### 1. 企业画像（Enterprise Profile）
- 企业基础信息（名称、类型、规模、资质）
- 贸易画像（主营品类、目标市场、供应/需求能力）
- 信用评分（基于历史交易、履约表现）

### 2. AI 匹配（Matching Engine）
- 供给-需求智能匹配
- 匹配度评分算法（多维度加权）
- 匹配结果生成

### 3. 智能定价（Pricing Agent）
- 货值验证（基于市场数据、历史成交价）
- 价格建议生成
- 非美元报价换算（锚定人民币/人民币计价）

### 4. 谈判助手（Negotiation Agent）
- 自动生成报价回复
- 议价区间建议
- 促成成交话术

### 5. 成交推进（Deal Push Agent）
- 商机状态流转
- 催办提醒生成
- 成交概率评估

## AI Provider Adapter 架构

```
src/
├── providers/
│   ├── base.ts          # Provider 接口定义
│   ├── openai.ts        # OpenAI 实现
│   ├── anthropic.ts     # Anthropic 实现
│   ├── google.ts       # Google Gemini 实现
│   └── index.ts        # 工厂函数
├── agents/
│   ├── matching/
│   ├── pricing/
│   ├── negotiation/
│   └── deal-push/
└── lib/
    └── vector-store.ts  # 向量存储（可选）
```

## API 路由设计

```
# 企业画像
POST   /api/profile/generate     # 生成企业画像
GET    /api/profile/:enterpriseId # 获取画像

# AI 匹配
POST   /api/matching/supply-demand # 供给-需求匹配
POST   /api/matching/score         # 匹配度评分

# 智能定价
POST   /api/pricing/validate      # 货值验证
POST   /api/pricing/suggest       # 价格建议

# 谈判助手
POST   /api/negotiation/reply    # 生成回复
POST   /api/negotiation/bargain  # 议价建议

# 成交推进
POST   /api/deal/evaluate        # 成交评估
POST   /api/deal/push             # 推进商机
```

## 环境变量
```
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_API_KEY=
DEFAULT_PROVIDER=openai
MOCK_MODE=true
```

## 交付物
1. 完整仓库骨架
2. Provider Adapter 核心实现（至少支持 OpenAI mock）
3. Phase 1 所有 AI 路由（带 mock 实现）
4. 仓库根目录 README.md
5. 同步更新 `06-repos/` 入口文件

## 完成标准
- [ ] npm run dev 可启动
- [ ] Provider 可切换（通过环境变量）
- [ ] 所有 AI API 返回 200（mock 模式）
- [ ] 符合 portal 制定的工程规范

---

**调度：** Claude Code 执行
**状态：** ⏳ 待启动
**创建时间：** 2026-03-15
