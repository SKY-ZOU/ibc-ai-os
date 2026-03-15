# IBC AI Trade OS — Admin BI

运营后台、审核后台与数据驾驶舱。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| UI | React 19 + Tailwind CSS 4 |
| 数据库 | SQLite + Prisma 5 |
| 端口 | 3004 |

## 快速启动

\`\`\`bash
cp .env.example .env.local
npm install
npx prisma generate
npx prisma db push
npm run dev
\`\`\`

访问 http://localhost:3004

## 页面路由

| Path | 说明 |
|------|------|
| /dashboard | 运营工作台（BI 驾驶舱） |
| /opportunities | 商机池 |
| /enterprises | 企业管理 |
| /reviews | 审核中心 |

## 数据库脚本

\`\`\`bash
npm run db:generate   # 生成 Prisma Client
npm run db:push       # 推送 schema 到 SQLite
npm run db:studio     # 打开 Prisma Studio
\`\`\`

## 状态

Phase 1 骨架 · 数据为占位 Mock · 待接入真实数据源
