

const co = require('co');
const path = require('path');
const chalk = require('chalk');

class Program {
  constructor() {
    this._commands = {
      // dev: dev command path
    };
    // your bin version
    this.version = require('../package.json').version;

    // custom command
    this.addCommand('init', path.join(__dirname, '/command/init-command.js'));
    this.addCommand('start', path.join(__dirname, '/command/start-command.js'));
    this.addCommand('build', path.join(__dirname, '/command/build-command.js'));
  }

  addCommand(cmd, filepath) {
    // each cmd module should contain two methods: run(args) and help()
    this._commands[cmd] = filepath;
  }

  onAction(cmd, cwd, args) {
    const filepath = this._commands[cmd];
    if (!filepath) {
      this.help();
      return;
    }
    co(function* () {
      const Command = require(filepath);
      yield new Command().run(cwd, args);
    }).catch((err) => {
      console.error('[beidou toolkit] run %s with %j at %s error:', cmd, args, cwd);
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
}

module.exports = Program;
