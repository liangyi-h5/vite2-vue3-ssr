# Vue 3 + Vue-Router + Typescript + Vite + express

基于vite2 搭建的 express + vue3 服务端渲染项目

[搭建指南](https://cn.vitejs.dev/guide/ssr.html)

# 安装依赖

> npm install

# 普通spa项目启动

> npm run serve

# 普通spa项目打包

> npm run build

# 服务端渲染node启动

> npm run dev:ssr

# 服务端渲染node打包并启动服务

打包
> npm run build:ssr

启动node服务
> npm run start

## 完整的ts语法支持

vscode插件安装
> Vue Language Features (Volar)
> TypeScript Vue Plugin (Volar)

当前工作区禁用 Vetur 插件 （ps: 不禁用回报红线，不影响运行，但是不好看）

## [PM2](https://pm2.keymetrics.io/docs/usage/cluster-mode/) 多进程启动
> pm2 start ecosystem.config.js

关闭进程：
> pm2 delete all

### .env环境变量配置
在项目跟目录新建.env文件 参照.env.example修改环境变量配置

有疑问可联系作者qq: 1471296255,或者发送邮件至邮箱1471296255@qq.com