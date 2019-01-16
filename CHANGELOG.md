# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/alibaba/beidou/compare/v1.2.1...v2.0.0) (2019-01-16)

**Note:** Version bump only for package beidou

<a name="1.2.1"></a>

## [1.2.1](https://github.com/alibaba/beidou/compare/v1.2.0...v1.2.1) (2019-01-07)

### Bug Fixes

- webpack log ([#133](https://github.com/alibaba/beidou/issues/133)) ([feab817](https://github.com/alibaba/beidou/commit/feab817))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/alibaba/beidou/compare/v1.1.0...v1.2.0) (2018-12-26)

### Bug Fixes

- 初始化设置逻辑判断修改 ([1d38a1d](https://github.com/alibaba/beidou/commit/1d38a1d))
- rename file ([f91d6f0](https://github.com/alibaba/beidou/commit/f91d6f0))
- 修复提交后的问题 ([d0e8ff0](https://github.com/alibaba/beidou/commit/d0e8ff0))
- 更新文档 ([e5354d6](https://github.com/alibaba/beidou/commit/e5354d6))

### Features

- return new object for webpack config and upgrade Readme.md ([18d8438](https://github.com/alibaba/beidou/commit/18d8438))
- support render to stream ([#126](https://github.com/alibaba/beidou/issues/126)) ([182d279](https://github.com/alibaba/beidou/commit/182d279)), closes [#124](https://github.com/alibaba/beidou/issues/124)
- support webpack config optimize ([ee6391b](https://github.com/alibaba/beidou/commit/ee6391b))
- upgrade documents ([07a2dee](https://github.com/alibaba/beidou/commit/07a2dee))
- webpack config optimization ([0217d6e](https://github.com/alibaba/beidou/commit/0217d6e))
- webpack factory ([#130](https://github.com/alibaba/beidou/issues/130)) ([8701f3e](https://github.com/alibaba/beidou/commit/8701f3e))
- 修改配置工厂实现和调用 ([91c4068](https://github.com/alibaba/beidou/commit/91c4068))
- 增加 webpack 配置项函数与文档更新 ([9cf62e3](https://github.com/alibaba/beidou/commit/9cf62e3))
- 更新文档 ([3089dd8](https://github.com/alibaba/beidou/commit/3089dd8))
- 配置工厂函数修整 ([ecd7b18](https://github.com/alibaba/beidou/commit/ecd7b18))
- 配置项初始化修改 ([4fa2cf5](https://github.com/alibaba/beidou/commit/4fa2cf5))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/alibaba/beidou/compare/v1.0.10...v1.1.0) (2018-12-18)

### Features

- support render to stream ([#126](https://github.com/alibaba/beidou/issues/126)) ([dce1416](https://github.com/alibaba/beidou/commit/dce1416)), closes [#124](https://github.com/alibaba/beidou/issues/124)

<a name="1.0.9"></a>

## [1.0.9](https://github.com/alibaba/beidou/compare/v1.0.8...v1.0.9) (2018-09-17)

### Bug Fixes

- rax ut failed as enabled `beautify` option ([b07aaa5](https://github.com/alibaba/beidou/commit/b07aaa5))

<a name="1.0.8"></a>

## [1.0.8](https://github.com/alibaba/beidou/compare/v1.0.7...v1.0.8) (2018-08-11)

### Bug Fixes

- **webpack:** isomorphic webpack set **webpack_public_path** default value, fix [#76](https://github.com/alibaba/beidou/issues/76) ([#78](https://github.com/alibaba/beidou/issues/78)) ([f6352c1](https://github.com/alibaba/beidou/commit/f6352c1))

<a name="1.0.5"></a>

## [1.0.5](https://github.com/alibaba/beidou/compare/v1.0.4...v1.0.5) (2018-06-14)

### Bug Fixes

- wrong bin file excuted in windows [#63](https://github.com/alibaba/beidou/issues/63) ([#65](https://github.com/alibaba/beidou/issues/65)) ([d2f7bac](https://github.com/alibaba/beidou/commit/d2f7bac))

# Change Log

## [1.0.1](https://github.com/alibaba/beidou/compare/v1.0.0...v1.0.1) (2018-03-26)

### Bug Fixes

- prevent `lib/core/agent/index.js` unexpectly loaded by plugin loader ([#35](https://github.com/alibaba/beidou/issues/35)) ([c30f27e](https://github.com/alibaba/beidou/commit/c30f27e))

## 1.0.0 (2018-03-23)

### BREAKING CHANGE

- Node version must >= 8
- React/react-dom versions must >= 16
- Replace `koa-webpack-dev-middleware` with `webpack-dev-server`
- all [webpack configurations](https://webpack.js.org/configuration/) except **entry** are available in `configs#webpack` option, see [default config](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/config/config.default.js)
- Move custom webpack config file path to `webpack.custom.configPath`, see [configuration](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/README.md#configuration)
- Custom webpack config file api, see [custom webpack configuration](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/README.md#custom-webpack-configuration)
- Remove `app.helper.resolveResource`, use `app.helper.asset` instead

### Features

- Upgrade to egg@2, support async/await style middlewares
- All in one manage tool - [beidou-cli](https://github.com/alibaba/beidou/blob/master/packages/beidou-cli/README.md), including init boilerplate, development, debug, test, build assets, start/stop production app, and so on.
- Custom view rendering process by [view middlewares](https://github.com/alibaba/beidou/blob/master/packages/beidou-view-react/README.md#custom-view-middlewares)
- Support [rax](https://github.com/alibaba/rax) isomorphic rendering, see [beidou-view-rax](https://github.com/alibaba/beidou/blob/master/packages/beidou-view-rax/README.md)
- Webpack support many frontend resource loaders, see [code](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/config/webpack/webpack.browser.js)
- Webpack support CSS Modules with `.module.{css|scss|less}` files
- Dump webpack config to `[root]/run` directory
- Custom babel client targets by [configuration](https://github.com/alibaba/beidou/blob/master/packages/babel-preset-beidou-client/README.md#configuration)
- Handle many reasonable default configs, you may not need a lot of options in your config files, see [examples](https://github.com/alibaba/beidou/tree/master/examples)

## [0.3.5](https://github.com/alibaba/beidou/compare/v0.3.4...v0.3.5) (2017-12-20)

### Bug Fixes

- [#5](https://github.com/alibaba/beidou/issues/5) path separator on Windows ([10990bf](https://github.com/alibaba/beidou/commit/10990bf))

### Features

- remove config dump override ([a5576e1](https://github.com/alibaba/beidou/commit/a5576e1))
- server side resolve alias ([82257e3](https://github.com/alibaba/beidou/commit/82257e3))
