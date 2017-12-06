const utils = require('../utils');

module.exports = view => next => function* (args) {
  const { Component, props } = args;
  const logger = props.ctx;

  // check static method in Component
  const render = Component.getPartial;
  if (render && typeof render === 'function') {
    const mapping = utils.isGenerator(render)
      ? yield render(props)
      : render(props);

    for (const key in mapping) {
      if (key in props) {
        logger.warn('[plugin:react:partial] `%s` already exists in props, origin value will be overwrited', key);
      }
      if (Array.isArray(mapping[key])) {
        const result = [];
        for (const app of mapping[key]) {
          result.push(view.renderReact(app));
        }
        props[key] = result;
      } else {
        props[key] = view.renderReact(mapping[key]);
      }
    }
  }

  yield next(args);
};
