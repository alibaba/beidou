'use strict';

const serialize = require('serialize-javascript');
const utils = require('../utils');

module.exports = () => next =>
  async function (args) {
    const { props, Component } = args;
    const getStore = Component.getStore;
    let store = null;
    if (utils.isAsyncFunc(getStore)) {
      store = await getStore.call(Component, props);
    } else if (typeof getStore === 'function') {
      store = getStore.call(Component, props);
    } else if (props.store) {
      store = props.store;
    }

    if (utils.isPromise(store)) {
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
    await next(args);
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
