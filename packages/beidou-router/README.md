<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

* [Beidou Router](#beidou-router)
  * [Install](#install)
  * [Configuration](#configuration)
  * [Usage](#usage)
  * [API](#api)
  * [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Beidou Router

> Auto Router for Beidou framework

### Install

```
$ npm install beidou-router --save
```

### Configuration

* config/plugin.default.js:

```
exports.router = {
  enable: true,
  package: 'beidou-router',
};
```

* config/config.default.js

```
  /**
   * View options
   * @member Config#view
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
     * files or directories should be ingored
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
     *
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
