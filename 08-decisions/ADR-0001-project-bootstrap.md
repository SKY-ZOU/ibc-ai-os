# ADR-0001 项目初始化决策

## 决策
先建立总控工作区，再启动分仓开发。

## 原因
- 当前项目跨系统、跨工具、跨阶段
- 需要让 OpenClaw 先理解项目，而不是直接改代码
- 需要统一产品、架构、任务与决策记录

## 结果
- 新建 IBC-AI-TRADE-OS 目录
- 建立 governance / prd / architecture / roadmap / prompts / tasks / repos / context / decisions 结构
- 主智能体从 PROJECT_MASTER.md 开始工作
