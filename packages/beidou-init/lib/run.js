'use strict';

const commander = require('commander');

module.exports = Program => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const program = new Program();

  commander
    .version(program.version)
    .usage('[command] [options]');

  commander
    .command('*')
    .description('See "More commands"')
    .action(cmd => {
      const args = process.argv.slice(3);
      program.onAction(cmd, process.cwd(), args);
    });

  commander.on('--help', () => {
    program.help();
  });


  if (!process.argv.slice(2).length) {
    commander.outputHelp();
  }

  commander.parse(process.argv);
};
