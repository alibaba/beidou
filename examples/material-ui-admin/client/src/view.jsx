import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/css/material-dashboard-react.css';
import indexRoutes from 'routes/index.jsx';
import favicon from '../public/favicon.ico';

const hist = __CLIENT__ ? createBrowserHistory() : createMemoryHistory();

export default class View extends React.Component {
  static getPartial() {
    const html = (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map(prop => (
            <Route
              path={prop.path}
              component={prop.component}
              key={prop.path}
            />
          ))}
        </Switch>
      </Router>
    );
    return { html };
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href={favicon} />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
          />
          <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" />
          <link rel="stylesheet" href={helper.asset('index.css')} />
          <title>Beidou example material ui admin</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  ReactDOM.hydrate(
    <Router history={hist}>
      <Switch>
        {indexRoutes.map(prop => (
          <Route path={prop.path} component={prop.component} key={prop.path} />
        ))}
      </Switch>
    </Router>,
    document.getElementById('root')
  );
}
