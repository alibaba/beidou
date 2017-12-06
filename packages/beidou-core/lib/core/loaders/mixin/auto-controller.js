
const fs = require('mz/fs');
const path = require('path');

function* resolvePath(names, root) {
  for (const name of names) {
    for (const dir of root) {
      const filename = path.join(dir, name);
      if (yield fs.exists(filename)) {
        return true;
      }
    }
  }
  return false;
}

module.exports = function* (ctx, app) {
  const config = (app && app.config && app.config.view) || {};
  const pageName = ctx.url === '/' ? 'index' : ctx.url;
  const filePath = yield resolvePath([pageName, pageName + config.defaultExtension], config.root);
  if (filePath) {
    yield ctx.render(pageName);
  } else {
    // ctx.body = `<div style="text-align: center">
    //   <H1>404</H1>
    //   <p>Can't found ${pageName} in ${config.root}</p>
    // </div>`;
    ctx.status = 404;
  }
};

