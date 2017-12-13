const serialize = require('serialize-javascript');
const utils = require('../utils');

module.exports = () => next => function* (args) {
  const { props, Component } = args;
  const getStore = Component.getStore;
  let store = null;
  if (getStore && utils.isGenerator(getStore)) {
    store = yield getStore.call(Component, props);
  } else if (typeof getStore === 'function') {
    store = getStore.call(Component, props);
  } else if (props.store) {
    store = props.store;
  }

  if (store) {
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
  yield next(args);
};

/**
 * serialize store object for interpolating in 'script' tag
 * @param {Object|ReduxStoreInstance} store
 */
function serializeStore(store) {
  const storeObject = typeof store.getState === 'function'
    ? store.getState()
    : store;

  return serialize(storeObject, { isJSON: true });
}
