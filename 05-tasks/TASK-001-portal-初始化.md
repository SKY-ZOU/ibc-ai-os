# TASK-001: portal 初始化

**状态**: 进行中  
**优先级**: P0  
**负责人**: 远谋（Claude Code）

## 任务目标
- 完成 portal 基础项目结构搭建
- 初始化 Next.js 15 App Router + TypeScript
- 配置 i18n (zh-CN / en)
- 配置 Prisma + libsql (SQLite)
- 初始化 git

## 技术栈
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7 + libsql (SQLite)
- next-intl 4

## 实施步骤

### Step 1: 完善项目结构
- [x] package.json 已存在
- [x] next.config.ts 已存在
- [x] tsconfig.json 已存在
- [ ] 创建 app 目录结构
- [ ] 创建 prisma/schema.prisma (Phase 1 核心表)
- [ ] 创建 .env.example

### Step 2: 初始化 git
- [ ] git init
- [ ] 创建 .gitignore

### Step 3: 完善 README
- [ ] 添加环境变量说明
- [ ] 添加启动命令

## 输出
- 目录树
- 技术栈说明
- 已创建文件清单
- 本地启动方式

## 完成标准
- [x] `npm run dev` 可启动
- [x] 访问 localhost:3000 显示首页
- [x] 支持 zh-CN / en 切换
