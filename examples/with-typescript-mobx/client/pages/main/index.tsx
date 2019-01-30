import * as React from 'react';
import { hydrate } from 'react-dom';
import { ViewProps } from 'beidou';
import Layout from './layout';
import App from './app';
import createStore from './store';

class Page extends React.Component<ViewProps> {
  static getInitialProps({ data = {}, ctx }) {
    const initState = data;

    const { store, history } = createStore({ initState, pathname: ctx.path });

    return {
      store,
      history,
    };
  }

  static getPartial({ store, history }) {
    return {
      html: <App store={store} history={history} />,
    };
  }

  render() {
    const { html, state, ...others } = this.props;
    const props = {
      ...others,
      entry: 'main',
      store: state,
    };
    return (
      <Layout {...props}>
        {html}
      </Layout>
    );
  }
}

if (__CLIENT__) {
  const initState = window.__STORE__;

  const { store, history } = createStore({ initState });

  hydrate(<App store={store} history={history}/>, document.getElementById('_'));
}

export default Page;
