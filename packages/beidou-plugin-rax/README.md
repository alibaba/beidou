# Beidou rax view plugin

<!-- TOC -->

* [Beidou rax view plugin](#beidou-rax-view-plugin)
  * [Install](#install)
  * [Configuration](#configuration)

<!-- /TOC -->

This plugin conflicts with `beidou-plugin-react`, `beidou-plugin-react` should be disabled while this plugin enabled.

## Install

```sh
yarn add beidou-plugin-rax
```

## Configuration

* config/plugin.js

```js
exports.rax = {
  enable: true,
  package: 'beidou-plugin-rax',
};
```

* config/config.default.js

```js
exports.rax = {
  cache: true,
};
```
