'use strict';

const helper = require('egg-scripts/lib/helper');

/**
 * @param {Number} time - sleep time in seconds
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  });
}

exports.cleanup = async function (baseDir) {
  const processList = await helper.findNodeProcess(x =>
    x.cmd.includes(`"baseDir":"${baseDir}"`)
  );

  if (processList.length) {
    console.log(`cleanup: ${processList.length} to kill`);
    for (const item of processList) {
      const pid = item.pid;
      const cmd = item.cmd;
      let type = `unknown: ${cmd}`;
      if (cmd.includes('start-cluster')) {
        type = 'master';
      } else if (cmd.includes('app_worker.js')) {
        type = 'worker';
      } else if (cmd.includes('agent_worker.js')) {
        type = 'agent';
      }

      try {
        process.kill(pid, type === 'master' ? '' : 'SIGKILL');
        console.log(`cleanup ${type} ${pid}`);
      } catch (err) {
        console.log(
          `cleanup ${type} ${pid} got error ${err.code || err.message || err}`
        );
        if (err.code !== 'ESRCH') {
          throw err;
        }
      }
    }

    await sleep('5s');
  }
};

exports.sleep = sleep;
