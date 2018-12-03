import * as React from 'react';
import { ViewProps } from 'beidou-core';
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
          <div id="container" dangerouslySetInnerHTML={
            {
              __html: html
            }
          } />
        </body>
      </html>
    );
  }
}
