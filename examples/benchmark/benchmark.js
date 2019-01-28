'use strict';

const Benchmark = require('benchmark');
const mm = require('egg-mock');
const table = require('markdown-table');

mm.consoleLevel('NONE');
// Benchmark.options.minSamples = 100;
let app = null;

const startApp = async () => {
  process.env.NODE_ENV = 'production';
  mm.env('prod');
  app = mm.app({
    baseDir: __dirname,
    framework: 'beidou',
  });
  await app.ready();
  await app.httpRequest().get('/');
};

const stopApp = () => app && app.close();

const suite = new Benchmark.Suite();

startApp().then(() => {
  suite
    .add('3000+DOM(depth=3,breadth=10,repeat=3)', {
      defer: true,
      fn(deferred) {
        app
          .httpRequest()
          .get('/?depth=3&breadth=10&repeat=3')
          .end(() => deferred.resolve());
      },
    })
    .add('2000+DOM(depth=3,breadth=10,repeat=2)', {
      defer: true,
      fn(deferred) {
        app
          .httpRequest()
          .get('/?depth=3&breadth=10&repeat=2')
          .end(() => deferred.resolve());
      },
    })
    .add('1000+DOM(depth=3,breadth=10,repeat=1)', {
      defer: true,
      fn(deferred) {
        app
          .httpRequest()
          .get('/?depth=3&breadth=10&repeat=1')
          .end(() => deferred.resolve());
      },
    })
    .add('500+DOM(depth=3,breadth=8,repeat=1)', {
      defer: true,
      fn(deferred) {
        app
          .httpRequest()
          .get('/?depth=3&breadth=8&repeat=1')
          .end(() => deferred.resolve());
      },
    })
    .add('300+DOM(depth=2,breadth=10,repeat=3)', {
      defer: true,
      fn(deferred) {
        app
          .httpRequest()
          .get('/?depth=2&breadth=10&repeat=3')
          .end(() => deferred.resolve());
      },
    })
    .on('start', () => {
      console.log(
        '\n  node version: %s, date: %s\n  Starting...',
        process.version,
        Date()
      );
    })
    .on('complete', () => {
      stopApp();
      const rows = [['Benchmark', 'Result']];
      for (let i = 0; i < suite.length; i += 1) {
        const bench = suite[i];
        const { hz, stats } = bench;
        const ops = hz.toFixed(hz < 100 ? 2 : 0);
        const deviation = stats.rme.toFixed(2);
        rows.push([bench.name, `x ${ops} ops/sec \xb1${deviation}%`]);
      }
      table([
        ['Branch', 'Commit'],
        ['master', '0123456789abcdef'],
        ['staging', 'fedcba9876543210'],
      ]);

      console.log('\n');
      console.log(table(rows));
      console.log('\n');
      process.exit(0);
    })
    .run();
});
