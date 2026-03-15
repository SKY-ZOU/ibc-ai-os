# IBC AI Trade OS - Portal

全球招引前台（国际门户）代码仓。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| UI | React 19 + Tailwind CSS 4 |
| 数据库 | SQLite + Prisma 5 |
| 国际化 | 自定义中间件 (zh-CN / en) |

## 目录结构

```
portal/
├── app/
│   ├── [locale]/              # 多语言页面
│   │   ├── onboarding/       # 企业入驻
│   │   ├── supply/           # 供给发布
│   │   ├── demand/           # 需求发布
│   │   └── page.tsx          # 首页
│   └── api/                  # API Routes
│       ├── enterprise/       # POST 创建企业
│       ├── product/          # POST 创建供给
│       └── demand/           # POST 创建需求
├── lib/
│   └── prisma.ts             # Prisma 客户端
├── prisma/
│   ├── schema.prisma         # 数据模型
│   └── dev.db                # SQLite 数据库
├── messages/                  # i18n 消息
├── .env                      # 环境变量
└── package.json
```

## 环境变量

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 启动命令

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Phase 1 数据模型

| 表 | 说明 |
|------|------|
| Enterprise | 企业信息 |
| Product | 产品/供给 |
| Demand | 需求 |
| Opportunity | 商机 |
| OpportunityMatch | 商机匹配 |

## API 接口

| Method | Path | 说明 |
|--------|------|------|
| POST | /api/enterprise | 创建企业 |
| POST | /api/product | 创建供给 |
| POST | /api/demand | 创建需求 |

## 页面路由

| Path | 说明 |
|------|------|
| /zh-CN | 中文首页 |
| /en | 英文首页 |
| /zh-CN/onboarding | 企业入驻 |
| /zh-CN/supply | 发布供给 |
| /zh-CN/demand | 发布需求 |

## Git

```bash
git init
git add .
git commit -m "feat: portal Phase 1 MVP - 企业入驻、供给/需求发布"
```
