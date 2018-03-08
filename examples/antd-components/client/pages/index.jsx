'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, StaticRouter,  Route, Link } from 'react-router-dom';
import { View } from '../layout';
import App from '../container';
import util from '../util';
import './index.less';


export default class Index extends Component {
  static getPartial({ ctx }) {
    return { html: <App location={ctx.req.url} /> };
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
  ReactDOM.render(<App />, document.getElementById('container'));
}
