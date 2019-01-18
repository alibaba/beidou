# Beidou

北斗同构框架

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![NPM Downloads][download-img]][npm-url]
[![Gitter][gitter-image]][gitter-url]
[![Node][nodejs-image]][nodejs-url]

[npm-image]: https://img.shields.io/npm/v/beidou-core.svg
[npm-url]: https://npmjs.org/package/beidou-core
[quality-image]: http://npm.packagequality.com/shield/beidou-core.svg
[quality-url]: http://packagequality.com/#?package=beidou-core
[travis-image]: https://img.shields.io/travis/alibaba/beidou.svg?branch=master
[travis-url]: https://travis-ci.org/alibaba/beidou
[codecov-image]: https://img.shields.io/codecov/c/github/alibaba/beidou.svg
[codecov-url]: https://codecov.io/gh/alibaba/beidou
[download-img]: https://img.shields.io/npm/dm/beidou-core.svg
[gitter-image]: https://img.shields.io/gitter/room/alibaba/beidou.svg
[gitter-url]: https://gitter.im/alibaba/beidou
[nodejs-image]: https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg
[nodejs-url]: https://nodejs.org

## 功能/特性

- ✔︎ 高性能, 相比客户端渲染 2-5 倍性能提升
- ✔︎ 搜索引擎友好(SEO)
- ✔︎ 支持 ES6/ES7/ES8 JavaScript 语法
- ✔︎ 支持 TypeScript
- ✔︎ 支持 SCSS/Sass
- ✔︎ 支持自动路由
- ✔︎ 提供扩展默认 webpack 配置的接口
- ✔︎ 可自定义视图渲染中间件
- ✔︎ 易使用的 CLI 工具
- ✔︎ 可拔插的同构能力
- ✔︎ 丰富的 [插件](./packages/beidou-docs/en/basic/plugins.md)

## 2.0 版本

**新特性**

- **BREAKING CHANGE**: 内置 babel 升级至 7
- **BREAKING CHANGE**: 内置 webpack 升级至 4

- 完备的 TypeScript 支持，开启仅需一行配置:

```json
// package.json

{
  "config": {
    "typescript": true
  }
}
```

具体用法参考 [typescript example](./examples/typescript).

## 快速开始

```bash
$ npm install beidou-cli -g
$ beidou init
$ npm run dev
```

打开 `http://localhost:6001/`

## 示例项目

- [simple](./examples/simple)
- [advanced](./examples/advanced)
- [with redux](./examples/redux)
- [with css-modules](./examples/css-modules)
- [performance optimization](./examples/performance)
- [更多...](./examples/)

## 文档

- [关于 Beidou](./packages/beidou-docs/zh/intro/about.md)
- [快速开始](./packages/beidou-docs/zh/quick-start/quick-start.md)
- 从零开始
  - [环境准备](./packages/beidou-docs/zh/quick-start/prepare-environment.md)
  - [目录结构](./packages/beidou-docs/zh/quick-start/directory-struct.md)
  - [从零开始构建应用](./packages/beidou-docs/zh/quick-start/step-by-step.md)
- 基础功能
  - [内置对象](./packages/beidou-docs/zh/basic/objects.md)
  - [运行时环境](./packages/beidou-docs/zh/basic/env.md)
  - [配置](./packages/beidou-docs/zh/basic/config.md)
  - [插件](./packages/beidou-docs/zh/basic/plugins.md)
  - [中间件](./packages/beidou-docs/zh/basic/middleware.md)
  - [路由](./packages/beidou-docs/zh/basic/router.md)
  - [控制器](./packages/beidou-docs/zh/basic/controller.md)
  - [服务](./packages/beidou-docs/zh/basic/service.md)
  - [定时任务](./packages/beidou-docs/zh/basic/schedule.md)
  - [框架扩展](./packages/beidou-docs/zh/basic/extend.md)
  - [自定义启动](./packages/beidou-docs/zh/basic/app-start.md)
- 核心功能
  - [开发调试](./packages/beidou-docs/zh/core/development.md)
  - [单元测试](./packages/beidou-docs/zh/core/unittest.md)
  - [日志](./packages/beidou-docs/zh/core/logger.md)
  - [调用 HTTP 服务](./packages/beidou-docs/zh/core/http-client.md)
  - [Cookie & Session](./packages/beidou-docs/zh/core/cookie-and-session.md)
  - [多进程模型和进程间通讯](./packages/beidou-docs/zh/core/cluster-and-ipc.md)
  - [同构渲染](./packages/beidou-docs/zh/core/isomorphic-render.md)
  - [错误处理](./packages/beidou-docs/zh/core/error-handling.md)
  - [安全](./packages/beidou-docs/zh/core/security.md)
  - [多语言](./packages/beidou-docs/zh/core/i18n.md)
- 部署
  - [应用部署](./packages/beidou-docs/zh/deployment/deployment.md)
- 教程
  - [渐进式开发](./packages/beidou-docs/zh/tutorials/progressive.md)
  - [MySQL](./packages/beidou-docs/zh/tutorials/mysql.md)
  - [Restful API](./packages/beidou-docs/zh/tutorials/restful.md)
  - [Async 方法](./packages/beidou-docs/zh/tutorials/async-function.md)
- 进阶
  - [北斗工作原理](./packages/beidou-docs/zh/advanced/architecture.md)
  - [Loader](./packages/beidou-docs/zh/advanced/loader.md)
  - [插件开发](./packages/beidou-docs/zh/advanced/plugin.md)
  - [多进程研发模式增强](./packages/beidou-docs/zh/advanced/cluster-enhancement.md)
  - [监控与告警](./packages/beidou-docs/zh/advanced/monitor.md)
  - [性能](./packages/beidou-docs/zh/advanced/performance.md)
  - [内存泄漏](./packages/beidou-docs/zh/advanced/oom.md)
  - [同构注意事项](./packages/beidou-docs/zh/advanced/attentions.md)

## 文章

- [D2 - 打造高可靠与高性能的 React 同构解决方案 PPT](./packages/beidou-docs/articles/D2_High_Reliability_and_Performance_Isomorphic_App.pdf)
- [打造高可靠与高性能的 React 同构解决方案](./packages/beidou-docs/articles/high-performance-isomorphic-app.md)
- [Node 应用内存泄漏分析方法论与实战](./packages/beidou-docs/articles/node-memory-leak.md)
- [唯快不破，让 nodejs 再快一点](./packages/beidou-docs/articles/node-performance-optimization.md)

## 性能

- 同构渲染与客户端渲染在 3G 网络下的对比

![isomorphic vs performance](http://img.alicdn.com/tfs/TB1inBqhnnI8KJjy0FfXXcdoVXa-702-666.gif)

- 在不同网络状况下同构与客户端渲染的性能对比

![isomorphic vs CSR performance](http://img.alicdn.com/tfs/TB172JBhb_I8KJjy1XaXXbsxpXa-1762-818.png)

## 需要帮助?

碰到任何问题请向我们提[issues](https://github.com/alibaba/beidou/issues)

钉钉和微信技术支持群如下

![](https://img.alicdn.com/tfs/TB1xFtzlf6H8KJjy0FjXXaXepXa-700-473.jpg)

注：微信群的有效期只有 7 天，我们将定期更新。万一二维码失效，请联系群主 EN_Holden 邀请入群

## 许可

[MIT](LICENSE)
