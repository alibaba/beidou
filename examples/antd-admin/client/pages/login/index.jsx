import React from 'react';
import { Provider } from 'react-redux';
import { View, render } from 'client/layout';
import configureStore from 'client/store';
import reducers from './reducers';
import saga from './saga';
import App from './container';

import './index.module.less';

export default class Page extends View {
  static defaultProps = {
    title: 'Login',
    asset: 'login',
  };

  static getStore() {
    const store = configureStore(reducers, saga, {
      username: {
        value: 'beidou',
      },
      password: {
        value: 'admin',
      },
      message: {
        error: false,
        message: '',
      },
    });

    return store;
  }

  static getPartial({ store }) {
    const html = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    return { html };
  }
}

render(App, reducers, saga);
