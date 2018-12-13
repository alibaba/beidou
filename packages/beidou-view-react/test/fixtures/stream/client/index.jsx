import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static getInitialProps({ ctx }) {
    const { disable, stream } = ctx.request.query;
    return {
      disable: !!disable,
      stream: !!stream
    };
  }


  render() {
    const { Render, disable, stream } = this.props;
    
    return (
      <html>
        <head>
          <title>Unittest</title>
        </head>
        <body>
          <Render disable={disable} stream app={<App />} />
        </body>
      </html>
    );
  }
}
