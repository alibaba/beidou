'use strict';

const { isAsyncFunc, isPromise } = require('./utils');

/** Render partial component from static method Component.getStore
 * @param comp - Sub class of React.Component
 * @param props - render props,includes user passes
 * `this.render(<filepath>, props)` in controller and request ctx.
 * @param render - react render function
 */
module.exports = async (comp, props, render) => {
  const { logger } = props.ctx;
  const { getPartial } = comp;

  let comps = null;
  if (isAsyncFunc(getPartial)) {
    comps = await getPartial.call(comp, props);
  } else if (typeof getPartial === 'function') {
    comps = getPartial.call(comp, props);
  } else {
    return null;
  }

  // TODO: prevent babel compile async func.
  if (isPromise(comps)) {
    comps = await comps;
  }

  const result = {};

  for (const key of Object.keys(comps)) {
    if (Array.isArray(comps[key])) {
      const renderedArr = [];
      for (const app of comps[key]) {
        renderedArr.push(render(app));
      }
      result[key] = renderedArr;
    } else {
      result[key] = render(comps[key]);
    }
    if (key in props) {
      logger.warn(
        '[rax:partial] prop `%s` origin value(%s) rewritten to %s',
        key,
        props[key],
        result[key]
      );
    }
  }

  return result;
};
