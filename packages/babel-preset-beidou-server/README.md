# babel-preset-beidou-server

> Babel preset for beidou server side.

This preset includes the following plugins:

- babel-preset-env
- babel-preset-react
- babel-preset-stage-2

## Install

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-beidou-server
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["beidou-server"] }' > .babelrc
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["beidou-server"]
}
```

### Via CLI

```sh
babel script.js --presets beidou-server
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  presets: ['beidou-server'],
});
```
