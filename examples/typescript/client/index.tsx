import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ViewProps } from 'beidou';
import App from './app';

export default class View extends React.Component<ViewProps>  {

  static getPartial() {
    return {
      html: <App />
    }
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>TypeScript</title>
          <link rel="stylesheet" href={helper.asset('index.css')}/>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{
              __html: html
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  ReactDOM.hydrate(<App />, document.getElementById('container'));
}
