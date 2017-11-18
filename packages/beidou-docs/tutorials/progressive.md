Progressive Development
---

Step-by-step example will be provided to demonstrate how to start coding development progressively.

Find detail codes on [eggjs/examples/progressive](https://github.com/eggjs/examples/tree/master/progressive).

## Getting Started

Assume we are writing a code to analyze UA to implement the function below:

- `ctx.isAndroid`
- `ctx.isIOS`

You can easily write it down after previous tutorials, let's have a quick review:

Codes refer to [step1](https://github.com/eggjs/examples/tree/master/progressive/step1).

Directory structure:

```bash
example-app
├── app
│   ├── extend
│   │   └── context.js
│   └── router.js
├── test
│   └── index.test.js
└── package.json
```

Core code:

```js
// app/extend/context.js
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
};
```

## Prototype of Plugin

Obviously, the logic is universal that can be written as a plugin.

But since function might not perfect at the beginning, it might difficult to maintain if encapsulate into a plugin directly.

We can put the code as the format of plugin, but not separate out.

Codes refer to [step2](https://github.com/eggjs/examples/tree/master/progressive/step2).

New directory structure:

```bash
example-app
├── app
│   └── router.js
├── config
│   └── plugin.js
├── lib
│   └── plugin
│       └── egg-ua
│           ├── app
│           │   └── extend
│           │       └── context.js
│           └── package.json
├── test
│   └── index.test.js
└── package.json
```

Core code:

- `app/extend/context.js` move to `lib/plugin/egg-ua/app/extend/context.js`.

- `lib/plugin/egg-ua/package.json` to declare plugin.

```json
{
  "eggPlugin": {
    "name": "ua"
  }
}
```

- `config/plugin.js` use `path` to mount the plugin.

```js
// config/plugin.js
const path = require('path');
exports.ua = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-ua'),
};
```

## Extraction to Independent Plugin

The module's functions become more better after a period of developing so we could extract it out as an independent plugin.

We extract an egg-ua plugin and have a quick review as below. Details refer to [Plugin Development](../advanced/plugin.md).

Directory structure:

```bash
egg-ua
├── app
│   └── extend
│       └── context.js
├── test
│   ├── fixtures
│   │   └── test-app
│   │       ├── app
│   │       │   └── router.js
│   │       └── package.json
│   └── ua.test.js
└── package.json
```

Codes refer to  [step3/egg-ua](https://github.com/eggjs/examples/tree/master/progressive/step3/egg-ua).

Then modify the application, details refer to [step3/example-app](https://github.com/eggjs/examples/tree/master/progressive/step3/example-app).

- Remove directory `lib/plugin/egg-ua`.
- declare dependencies `egg-ua`  in `package.json`.
- change type to `package` in `config/plugin.js`.

```js
// config/plugin.js
exports.ua = {
  enable: true,
  package: 'egg-ua',
};
```

**Note：We can use `npm link` for local test before releasing the plugin. Details refer to  [npm-link](https://docs.npmjs.com/cli/link).**

```bash
$ cd example-app
$ npm link ../egg-ua
$ npm i
$ npm test
```

