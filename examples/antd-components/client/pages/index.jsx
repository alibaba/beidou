'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { View } from '../layout';
import App from '../container';
import './index.less';

export default class Index extends Component {
  static getPartial({ ctx }) {
    return { html: <App location={ctx.req.url} context={{}} /> };
  }

  render() {
    const { html } = this.props;
    return (
      <View {...this.props}>
        <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
      </View>
    );
  }
}

if (__CLIENT__) {
  ReactDOM.hydrate(<App />, document.getElementById('container'));
}
