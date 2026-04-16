# 部署指南

## 部署到 Vercel（推荐）

1. 将代码推送到 GitHub **Private** 仓库。
2. 访问 [vercel.com](https://vercel.com) → **Add New Project** → 导入该项目仓库。
3. Framework Preset 选择 **Vite**。
4. 直接点击 **Deploy**（`.env` 已包含在仓库中，无需额外配置环境变量）。
5. 部署完成后，Vercel 会生成一个 `.vercel.app` 域名，复制分享给协作者即可。

## 本地开发

```bash
npm install
npm run dev
```

## 数据说明

- 所有行程和装备数据已内嵌在应用中。
- 用户操作自动保存在浏览器 `localStorage`。
- 已配置 Supabase，数据会同时同步到云端，两人共用一个账号 `cycle`，跨设备实时共享。
