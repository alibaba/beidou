'use strict';

const co = require('co');
const path = require('path');
const chalk = require('chalk');
const check = require('check-node-version');

class Program {
  constructor() {
    this._commands = {
      // dev: dev command path
    };
    // your bin version
    this.version = require('../package.json').version;

    // custom command
    this.addCommand('start', path.join(__dirname, '/command/start-command.js'));
    this.addCommand('dev', path.join(__dirname, '/command/start-command.js'));
    this.addCommand('build', path.join(__dirname, '/command/build-command.js'));
  }

  addCommand(cmd, filepath) {
    // each cmd module should contain two methods: run(args) and help()
    this._commands[cmd] = filepath;
  }

  onAction(cmd, cwd, args) {
    const self = this;
    const filepath = this._commands[cmd];
    if (!filepath) {
      this.help();
      return;
    }
    co(function* () {
      // check node version before running
      yield self.check();

      const Command = require(filepath);
      yield new Command().run(cwd, args);
      process.exit(0);
    }).catch((err) => {
      console.error('[beidou-bin] run %s with %j at %s error:', cmd, args, cwd);
      console.error(chalk.red(err.stack));
      process.exit(1);
    });
  }

  help() {
    for (const cmd in this._commands) {
      const Command = require(this._commands[cmd]);
      console.log('    %s - %s', cmd, new Command().help());
    }
    console.log('');
  }

  check(ver = '>=8') {
    return new Promise((resolve, reject) => {
      check({ node: ver }, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        const { versions: { node } } = results;

        if (node.isSatisfied) {
          resolve(true);
        } else {
          reject(new Error(`Error: Wanted node version ${ver}`));
        }
      });
    });
  }
}

module.exports = Program;
