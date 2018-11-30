import * as React from 'react';
import App from './app';

declare interface IViewProps {
  helper: {
    asset: (name: string) => string;
  };
  html: string;
}

export default class View extends React.Component<IViewProps> {

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
