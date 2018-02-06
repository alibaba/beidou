'use strict';

const serialize = require('serialize-javascript');
const { isPromise, isAsyncFunc } = require('./utils');

/**
 * serialize store object for interpolating in 'script' tag
 * @param {Object|ReduxStoreInstance} store
 */
function serializeStore(store) {
  const storeObject =
    typeof store.getState === 'function' ? store.getState() : store;

  return serialize(storeObject, { isJSON: true });
}

/** Get store from static method Component.getStore
 * @param comp - Sub class of React.Component
 * @param props - render props,includes user passes
 * `this.render(<filepath>, props)` in controller and request ctx.
 */
module.exports = async (comp, props) => {
  const { getStore } = comp;

  let store;
  if (isAsyncFunc(getStore)) {
    store = await getStore.call(comp, props);
  } else if (typeof getStore === 'function') {
    store = getStore.call(comp, props);
  } else if (props.store) {
    store = props.store;
  }

  if (isPromise(store)) {
    store = await store;
  }

  let state;
  if (store) {
    if (Array.isArray(store)) {
      const states = [];
      for (const single of store) {
        states.push(serializeStore(single));
      }
      state = states;
    } else {
      state = serializeStore(store);
    }
  }

  const result = { store, state };
  if (!store) {
    delete result.store;
  }
  if (!state) {
    delete result.state;
  }

  return result;
};
