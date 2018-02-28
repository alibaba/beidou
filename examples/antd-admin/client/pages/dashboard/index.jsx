import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'client/store';
import { View } from 'client/layout';
import reducers from './reducers';
import saga, { run } from './saga';
import routes from './routes';
import Layout from './layout';
import actions from './actions';

import './index.less';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

export default class RouteView extends View {
  static defaultProps = {
    title: 'dashboard',
    asset: 'main',
  };

  static async getStore({ ctx }) {
    const store = configureStore(reducers, saga);
    const users = await ctx.service.user.findAll();
    store.dispatch(actions.user.fetchSuccess(users));
    return store;
  }

  static getPartial({ store, ctx }) {
    const props = {};
    if (ctx && ctx.url) {
      props.location = ctx.url;
      props.context = {
        location: {
          pathname: ctx.pathname,
        },
      };
    }
    const html = (
      <Provider store={store}>
        <Router {...props}>
          <Layout>{routes}</Layout>
        </Router>
      </Provider>
    );

    return { html };
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  const store = configureStore(reducers, saga, window.__INITIAL_STATE__);
  const app = (
    <Provider store={store}>
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </Provider>
  );

  // run saga
  run();

  ReactDOM.hydrate(app, document.getElementById('container'));
}
