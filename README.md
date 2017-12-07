Isomorphic framework for server-rendered React apps

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Gitter][gitter-image]][gitter-url]

[npm-image]: https://img.shields.io/npm/v/beidou-core.svg?style=flat-square
[npm-url]: https://npmjs.org/package/beidou-core
[quality-image]: http://npm.packagequality.com/shield/beidou-core.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=beidou-core
[travis-image]: https://img.shields.io/travis/alibaba/beidou.svg?style=flat-square
[travis-url]: https://travis-ci.org/alibaba/beidou
[codecov-image]: https://img.shields.io/codecov/c/github/alibaba/beidou.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/alibaba/beidou
[gitter-image]: https://img.shields.io/gitter/room/alibaba/beidou.svg?style=flat-square
[gitter-url]: https://gitter.im/alibaba/beidou

## Features

- ✔︎ High performance, 2-5 times speed up
- ✔︎ Search engine optimization(SEO)
- ✔︎ React server side render
- ✔︎ ES6/ES7 supported
- ✔︎ Css modules supported
- ✔︎ Lots of [plugins](./packages/beidou-docs/basic/plugins.md)

## How to use

```bash
$ npm install beidou-init -g
$ beidou init
$ npm run start
```

After that, go to `http://localhost:6001/`

## Boilerplate
* [empty-template](./examples/empty-template)
* [simple-template](./examples/simple-template)
* [advance-template](./examples/advance)

## Documentation

* [Quick Start](./packages/beidou-docs/quick-start/quick-start.md)
* Step by Step
   * [Environment](./packages/beidou-docs/quick-start/prepare-environment.md)  
   * [Directory Structure](./packages/beidou-docs/quick-start/directory-struct.md)  
   * [Step by Step](./packages/beidou-docs/quick-start/step-by-step.md)
* Basics
   * [Built-in Objects](./packages/beidou-docs/basic/objects.md)
   * [Runtime Environment](./packages/beidou-docs/basic/env.md)
   * [Configuration](./packages/beidou-docs/basic/config.md)
   * [Plugins](./packages/beidou-docs/basic/plugins.md)
   * [Middlewares](./packages/beidou-docs/basic/middleware.md)
   * [Router](./packages/beidou-docs/basic/router.md)
   * [Controller](./packages/beidou-docs/basic/controller.md)
   * [Service](./packages/beidou-docs/basic/service.md)
   * [Schedule](./packages/beidou-docs/basic/schedule.md)
   * [Extend](./packages/beidou-docs/basic/extend.md)
   * [Mock](./packages/beidou-docs/basic/Mock.md)
   * [Custom startup](./packages/beidou-docs/basic/app-start.md)
* Core
   * [Development](./packages/beidou-docs/core/development.md)
   * [Unit Testing](./packages/beidou-docs/core/unittest.md)
   * [Logger](./packages/beidou-docs/core/logger.md)
   * [HttpClient](./packages/beidou-docs/core/http-client.md)
   * [Cookie & Session](./packages/beidou-docs/core/cookie-and-session.md)
   * [Cluster and IPC](./packages/beidou-docs/core/cluster-and-ipc.md)
   * [Ismorphic Render](./packages/beidou-docs/core/isomorphic-render.md)
   * [Error Handling](./packages/beidou-docs/core/error-handling.md)
   * [Security](./packages/beidou-docs/core/security.md)
   * [Multi-language](./packages/beidou-docs/core/i18n.md)
* Deployment
    * [Deployment](./packages/beidou-docs/deployment/deployment.md)
    * [DevOps](./packages/beidou-docs/deployment/devops.md)
    * [Docker](./packages/beidou-docs/deployment/docker.md)
* Tutorials
    * [Progressive](./packages/beidou-docs/tutorials/progressive.md)
    * [MySQL](./packages/beidou-docs/tutorials/mysql.md)
    * [Restful API](./packages/beidou-docs/tutorials/restful.md)
    * [Async Function](./packages/beidou-docs/tutorials/async-function.md)
* Advanced
    * [How It Works](./packages/beidou-docs/advanced/architecture.md)
    * [Loader](./packages/beidou-docs/advanced/loader.md)
    * [Plugin Development](./packages/beidou-docs/advanced/plugin.md)
    * [Cluster Enhancement](./packages/beidou-docs/advanced/cluster-enhancement.md)
    * [Monitor](./packages/beidou-docs/advanced/monitor.md)
    * [Performance](./packages/beidou-docs/advanced/performance.md)  
    * [Memory Leaks](./packages/beidou-docs/advanced/oom.md)
    * [SSR Attentions](./packages/beidou-docs/advanced/attentions.md)

## Performance

* Isomorphic rendering performance VS client side rendering performance in 3G network

![isomorphic vs performance](https://img.alicdn.com/tfs/TB1inBqhnnI8KJjy0FfXXcdoVXa-702-666.gif)

* Performance comparison in different network environment 

![](https://img.alicdn.com/tfs/TB172JBhb_I8KJjy1XaXXbsxpXa-1762-818.png)

## License

[MIT](LICENSE)


