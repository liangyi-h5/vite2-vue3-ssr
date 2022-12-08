# Vue 3 + Vue-Router + Typescript + Vite + express

# 项目查看地址：<a href="http://124.220.185.110" >http://124.220.185.110/</a>

### 如果项目模版对你们有用的话，希望能留下你们的小星星：
ps: 你们星星是我最大的动力

gitee: https://gitee.com/li_liang_xian/vite2-vue3-ssr

github: https://github.com/liangyi-h5/vite2-vue3-ssr

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

### 预渲染 静态网站打包

该打包会针对每个页面进行打包生成html静态资源文件，请配置 src/router/prerenderRouter.json 文件针对需要打包处理的路由进行命名

打包后会在项目根目下生成dist文件夹

> npm run generate

## 完整的ts语法支持

vscode插件安装
> Vue Language Features (Volar)
> TypeScript Vue Plugin (Volar)

当前工作区禁用 Vetur 插件 （ps: 不禁用回报红线，不影响运行，但是不好看）

## [PM2](https://pm2.keymetrics.io/docs/usage/cluster-mode/) 多进程启动

全局安装pm2
> npm i -g pm2

启动
> npm run pm2:start

关闭进程：
> npm run pm2:stop

## 需要配置eslint 请建立.env文件，配置相关参数

> OPEN_SELINT=true

### .env环境变量配置
在项目跟目录新建.env文件 参照.env.example修改环境变量配置

有疑问可联系作者qq: 1471296255,或者发送邮件至邮箱1471296255@qq.com
