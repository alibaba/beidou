# Beidou Router

> Auto Router for Beidou framework

## Install

```bash
$ npm install beidou-router --save
```

## Configuration

- config/plugin.js:

```js
exports.router = {
  enable: true,
  package: 'beidou-router',
};
```

- config/config.default.js

```js
/**
 * Router options
 * @member Config#router
 */
exports.router = {
  /**
   * root directory for auto match route
   * include server route and webpack entry
   * @member {String} Config#root
   * @since 1.0.0
   */
  root: '/',

  /**
   * files or directories should be ignored
   * when automatically match route
   * @member {String} Config#exclude
   * @since 1.0.0
   */
  exclude: '_*',

  /**
   * define custom mapping files to router
   *
   * {
   *  user: {
   *    profile: 'get',
   *    ':id': ['post', 'get'],
   *  }
   * }
   *
   */
  mapping: null,

  entry: 'index',
};
```

### Usage

Straightly visit page located in `client` directory.

e.g. with default config, access `GET: /` will render `client/index.jsx` file.

### API

> coming soon

## License

[MIT](LICENSE)
