# Beidou

🌌 Isomorphic framework for server-rendered React apps

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

> Chinese Documentation - [中文文档](./README-ZH.md)

## Features

- ✔︎ High performance, 2-5 times speedup compares to client-side rendering
- ✔︎ Search engine optimization(SEO)
- ✔︎ ES6/ES7/ES8 supported
- ✔︎ TypeScript supported
- ✔︎ React **renderToNodeStream** supported
- ✔︎ SCSS/Sass with autoprefixer supported
- ✔︎ Auto router supported
- ✔︎ Extends default webpack config supported
- ✔︎ View rendering middleware supported
- ✔︎ User-friendly CLI tool
- ✔︎ Lots of [plugins](./packages/beidou-docs/en/basic/plugins.md)

## Release 2.0

**New Features**

- **BREAKING CHANGE**: Upgrade internal babel to 7
- **BREAKING CHANGE**: Upgrade internal webpack to 4

- Completely TypeScript Support, enable with one line config:

```json
// package.json

{
  "config": {
    "typescript": true
  }
}
```

see [typescript example](./examples/typescript) for more detail.

## Quick start

```bash
$ npm install beidou-cli -g
$ beidou init
$ npm run dev
```

Navigate to `http://localhost:6001/`

## Boilerplate

- [simple](./examples/simple)
- [advanced](./examples/advanced)
- [typescript](./examples/typescript)
- [with redux](./examples/redux)
- [with css-modules](./examples/css-modules)

## Documentation

- [Quick Start](./packages/beidou-docs/en/quick-start/quick-start.md)
- Step by Step
  - [Environment](./packages/beidou-docs/en/quick-start/prepare-environment.md)
  - [Directory Structure](./packages/beidou-docs/en/quick-start/directory-struct.md)
  - [Step by Step](./packages/beidou-docs/en/quick-start/step-by-step.md)
- Basics
  - [Built-in Objects](./packages/beidou-docs/en/basic/objects.md)
  - [Runtime Environment](./packages/beidou-docs/en/basic/env.md)
  - [Configuration](./packages/beidou-docs/en/basic/config.md)
  - [Plugins](./packages/beidou-docs/en/basic/plugins.md)
  - [Middlewares](./packages/beidou-docs/en/basic/middleware.md)
  - [Router](./packages/beidou-docs/en/basic/router.md)
  - [Controller](./packages/beidou-docs/en/basic/controller.md)
  - [Service](./packages/beidou-docs/en/basic/service.md)
  - [Schedule](./packages/beidou-docs/en/basic/schedule.md)
  - [Extend](./packages/beidou-docs/en/basic/extend.md)
  - [Custom startup](./packages/beidou-docs/en/basic/app-start.md)
- Core
  - [Development](./packages/beidou-docs/en/core/development.md)
  - [Unit Testing](./packages/beidou-docs/en/core/unittest.md)
  - [Logger](./packages/beidou-docs/en/core/logger.md)
  - [HttpClient](./packages/beidou-docs/en/core/http-client.md)
  - [Cookie & Session](./packages/beidou-docs/en/core/cookie-and-session.md)
  - [Cluster and IPC](./packages/beidou-docs/en/core/cluster-and-ipc.md)
  - [Ismorphic Render](./packages/beidou-docs/en/core/isomorphic-render.md)
  - [Error Handling](./packages/beidou-docs/en/core/error-handling.md)
  - [Security](./packages/beidou-docs/en/core/security.md)
  - [Multi-language](./packages/beidou-docs/en/core/i18n.md)
- Deployment
  - [Deployment](./packages/beidou-docs/en/deployment/deployment.md)
  - [DevOps](./packages/beidou-docs/en/deployment/devops.md)
  - [Docker](./packages/beidou-docs/en/deployment/docker.md)
- Tutorials
  - [Progressive](./packages/beidou-docs/en/tutorials/progressive.md)
  - [MySQL](./packages/beidou-docs/en/tutorials/mysql.md)
  - [Restful API](./packages/beidou-docs/en/tutorials/restful.md)
  - [Async Function](./packages/beidou-docs/en/tutorials/async-function.md)
- Advanced
  - [How It Works](./packages/beidou-docs/en/advanced/architecture.md)
  - [Loader](./packages/beidou-docs/en/advanced/loader.md)
  - [Plugin Development](./packages/beidou-docs/en/advanced/plugin.md)
  - [Cluster Enhancement](./packages/beidou-docs/en/advanced/cluster-enhancement.md)
  - [Monitor](./packages/beidou-docs/en/advanced/monitor.md)
  - [Performance](./packages/beidou-docs/en/advanced/performance.md)
  - [Memory Leaks](./packages/beidou-docs/en/advanced/oom.md)
  - [SSR Attentions](./packages/beidou-docs/en/advanced/attentions.md)

## Articles

- [D2 - High Reliability & Performance Isomorphic App](./packages/beidou-docs/articles/D2_High_Reliability_and_Performance_Isomorphic_App.pdf)
- [High performance isomorphic-rendered React Apps](./packages/beidou-docs/articles/high-performance-isomorphic-app.md)
- [How to resolve nodejs memory leak](./packages/beidou-docs/articles/node-memory-leak.md)
- [Nodejs application performance optimization](./packages/beidou-docs/articles/node-performance-optimization.md)

## Performance

- Isomorphic rendering performance VS client side rendering performance in 3G network

![isomorphic vs performance](http://img.alicdn.com/tfs/TB1inBqhnnI8KJjy0FfXXcdoVXa-702-666.gif)

- Performance comparison in different network environment

![isomorphic vs performance](http://img.alicdn.com/tfs/TB172JBhb_I8KJjy1XaXXbsxpXa-1762-818.png)

## Need Help?

Please let us know how can we help. Do check out [issues](https://github.com/alibaba/beidou/issues) for bug reports or suggestions first.

DingTalk group supported

![](https://img.alicdn.com/tfs/TB1iC0ycuH2gK0jSZFEXXcqMpXa-970-1280.jpg_400x400.jpg)

DingTalk Group Number: 23374510

## License

[MIT](LICENSE)
