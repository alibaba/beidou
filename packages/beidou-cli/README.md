# beidou-cli

Beidou application cli tool

## Install

Global install `beidou-cli` if you need to init beidou boilerplate, use local install otherwise.

- global

  ```bash
  $ npm install beidou-cli -g
  ```

- local

  ```bash
  $ npm install beidou-cli --save
  ```

## Usage

Add `beidou` to `package.json` scripts:

```json
{
  "scripts": {
    "dev": "beidou dev",
    "debug": "beidou debug",
    "test": "beidou test",
    "cov": "beidou cov",
    "start": "beidou start",
    "stop": "beidou stop",
    "build": "beidou build"
  }
}
```

## Command

All the commands support these specific v8 options:

- `--debug`
- `--inspect`
- `--harmony*`
- `--es_staging`

```bash
$ beidou [command] --debug --es_staging
```

if `process.env.NODE_DEBUG_OPTION` is provided (WebStorm etc), will use it as debug options.

### `init` command

Init beidou boilerplate project

```bash
$ beidou init
```

#### options

- `--tag=next` init boilerplate project with npm next tag, used for alpha or beta version.
- `--force` force to overwrite directory.

#### Choose boilerplate

```bash
$ beidou init
? Please select a boilerplate type (Use arrow keys)
❯ Simple - Simple beidou isomorphic app boilerplate
  Redux - Redux beidou isomorphic app boilerplate
  CSS-MODULES - css-modules beidou isomorphic app boilerplate
  Advanced - Advanced beidou isomorphic app boilerplate
```

### dev

Start dev cluster on `local` env, it will start a master, an agent and a worker.

```bash
$ beidou dev
```

#### options

- `--baseDir` application's root path, default to `process.cwd()`.
- `--port` server port, default to `6001`.
- `--cluster` worker process number, skip this argvs will start only `1` worker, provide this without value will start `cpu` count worker.
- `--sticky` start a sticky cluster server, default to `false`.

### debug

Debug beidou app with [V8 Inspector Integration](https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js).

automatically detect the protocol, use the new `inspector` when the targeted runtime >=7.0.0 .

use [inspector-proxy](https://github.com/whxaxes/inspector-proxy) to proxy worker debug, so you don't need to worry about reload.

```bash
$ beidou debug --debug-port=9229 --proxy=9999
```

#### options

- all `beidou dev` options is accepted.
- `--proxy=9999` worker debug proxy port.

### test

Using [mocha] with [co-mocha] to run test.

[power-assert] is the default `assert` library, and [intelli-espower-loader] will be auto required.

```bash
$ beidou test [files] [options]
```

- `files` is optional, default to `test/**/*.test.js`
- `test/fixtures`, `test/node_modules` is always exclude.

#### auto require `test/.setup.js`

If `test/.setup.js` file exists, it will be auto require as the first test file.

```js
test
  ├── .setup.js
  └── foo.test.js
```

#### options

You can pass any mocha argv.

- `--require` require the given module
- `--grep` only run tests matching <pattern>
- `--timeout` milliseconds, default to 30000
- `--full-trace` display the full stack trace, default to false.
- see more at https://mochajs.org/#usage

#### environment

Environment is also support, will use it if options not provide.

You can set `TESTS` env to set the tests directory, it support [glob] grammar.

```bash
TESTS=test/a.test.js beidou test
```

And the reporter can set by the `TEST_REPORTER` env, default is `spec`.

```bash
TEST_REPORTER=doc beidou test
```

The test timeout can set by `TEST_TIMEOUT` env, default is `30000` ms.

```bash
TEST_TIMEOUT=2000 beidou test
```

### cov

Using [istanbul] to run code coverage, it support all test params above.

Coverage reporter will output text-summary, json and lcov.

#### options

You can pass any mocha argv.

- `-x` add dir ignore coverage, support multiple argv
- `--prerequire` prerequire files for coverage instrument, you can use this options if load files slowly when call `mm.app` or `mm.cluster`
- also support all test params above.

#### environment

You can set `COV_EXCLUDES` env to add dir ignore coverage.

```bash
$ COV_EXCLUDES="app/plugins/c*,app/autocreate/**" beidou cov
```

### start

Start beidou server at production mode.

```bash
$ beidou start [options] [baseDir]
# Usage
# beidou start --port=7001
# beidou start ./server
```

- **Arguments**
  - `baseDir` - directory of application, default to `process.cwd()`.
- **Options**
  - `port` - listening port, default to `process.env.PORT`, if unset, egg will use `6001` as default.
  - `title` - process title description, use for kill grep, default to `egg-server-${APP_NAME}`.
  - `workers` - numbers of app workers, default to `process.env.EGG_WORKERS`, if unset, egg will use `os.cpus().length` as default.
  - `daemon` - whether run at background daemon mode, don't use it if in docker mode.
  - `env` - server env, default to `process.env.EGG_SERVER_ENV`, recommended to keep empty then use framwork default env.
  - `stdout` - customize stdout file, default to `$HOME/logs/master-stdout.log`.
  - `stderr` - customize stderr file, default to `$HOME/logs/master-stderr.log`.
  - `timeout` - the maximum timeout when app starts, default to 300s.
  - `ignore-stderr` - whether ignore stderr when app starts.

### stop

Stop beidou gracefull.

**Note:** if exec without `--title`, it will kill all egg process.

```bash
# stop egg
$ beidou stop [--title=example]
```

- **Options**
  - `title` - process title description, use for kill grep.

### build

Build beidou assets

- **Options**
  - `target` - build target, `node` or `browser`(default)

## License

[MIT](LICENSE)
