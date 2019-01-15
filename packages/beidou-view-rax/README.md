# Beidou rax view plugin

<!-- TOC -->

- [Beidou rax view plugin](#beidou-view-rax-plugin)
  - [Install](#install)
  - [Configuration](#configuration)

<!-- /TOC -->

This plugin conflicts with `beidou-view-react`, `beidou-view-react` should be disabled while this plugin enabled.

## Install

```sh
yarn add beidou-view-rax
```

## Configuration

- config/plugin.js

```js
exports.rax = {
  enable: true,
  package: 'beidou-view-rax',
};
```

- config/config.default.js

```js
exports.rax = {
  cache: true,
};
```
