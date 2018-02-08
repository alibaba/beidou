# babel-preset-beidou-client

> Babel preset for beidou client side.

This preset includes the following plugins:

* babel-preset-env
* babel-preset-react
* babel-preset-stage-2
* babel-plugin-transform-runtime
* babel-plugin-typecheck
* react-hot-loader

## Install

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-beidou-client
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["beidou-client"] }' > .babelrc
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["beidou-client"]
}
```

### Via CLI

```sh
babel script.js --presets beidou-client
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  presets: ['beidou-client'],
});
```
