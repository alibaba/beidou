const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const terser = require('terser');
const cssmin = require('cssmin');
const argh = require('argh');

const { argv } = argh;

const dev = !!argv.dev;

const libs = {
  'next.css': `@alifd/next/dist/next${dev ? '' : '.min'}.css`,
  'next.js': `@alifd/next/dist/next${dev ? '' : '.min'}.js`,
  'moment.js': `moment/min/moment-with-locales${dev ? '' : '.min'}.js`,
  'react.js': `react/umd/react.${dev ? 'development' : 'production.min'}.js`,
  'react-dom.js': `react-dom/umd/react-dom.${
    dev ? 'development' : 'production.min'
  }.js`,
};

const buildDir = path.join(__dirname, '../build');

for (const name in libs) {
  if (libs[name]) {
    const rule = libs[name];
    if (typeof rule === 'string') {
      const from = path.join(__dirname, '../node_modules', rule);
      const target = path.join(buildDir, name);
      const content = minify(from);
      console.log('copy %s into %s', from, target);
      fs.outputFileSync(target, content);
    } else if (rule && rule.from) {
      const origin = path.join(__dirname, '../node_modules', rule.from);

      if (rule.dir) {
        const target = path.join(buildDir, name);
        console.log('copy %s into %s', origin, target);
        fs.copySync(origin, target);
        return;
      }

      const files = glob.sync(rule.filter, {
        cwd: origin,
        nodir: true,
        matchBase: true,
      });

      for (const file of files) {
        const target = path.join(buildDir, name, file);
        const from = path.join(origin, file);
        const content = minify(from);
        console.log('copy %s into %s', from, target);
        fs.outputFileSync(target, content);
      }
    }
  }
}

function minify(from) {
  const ext = path.extname(from);
  let content = fs.readFileSync(from, 'utf8').toString();

  if (!argv.minify) {
    return content;
  }
  if (ext === '.js') {
    content = terser.minify(content, { compress: false }).code;
  } else if (ext === '.css') {
    content = cssmin(content);
  }
  return content;
}
