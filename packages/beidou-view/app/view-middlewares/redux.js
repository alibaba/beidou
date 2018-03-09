'use strict';

const serialize = require('serialize-javascript');
const is = require('is-type-of');

module.exports = async function (viewCtx, next) {
  const { props, Component } = viewCtx;
  const { getStore } = Component;
  let store = null;
  if (is.asyncFunction(getStore)) {
    store = await getStore.call(Component, props);
  } else if (typeof getStore === 'function') {
    store = getStore.call(Component, props);
  } else if (props.store) {
    /* eslint-disable prefer-destructuring */
    store = props.store;
  }

  if (is.promise(store)) {
    store = await store;
  }

  if (store) {
    props.store = store;
    // Array support
    if (Array.isArray(store)) {
      const states = [];
      for (const single of store) {
        states.push(serializeStore(single));
      }
      props.state = states;
    } else {
      props.state = serializeStore(store);
    }
  }
  await next();
};

/**
 * serialize store object for interpolating in 'script' tag
 * @param {Object|ReduxStoreInstance} store
 */
function serializeStore(store) {
  const storeObject =
    typeof store.getState === 'function' ? store.getState() : store;

  return serialize(storeObject, { isJSON: true });
}
