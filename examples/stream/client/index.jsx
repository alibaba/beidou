import React from 'react';
import App from './app';
import './index.less';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  render() {
    const { helper, Render } = this.props;
    const streams = [...new Array(10)].map((v, i) => (
      <Render
        key={i}
        enable
        stream
        app={<App stream index={i} />}
      />
    ));
    return (
      <html>
        <head>
          <title>Script</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <h1>RenderToNodeStream Demo</h1>
          {streams}
        </body>
      </html>
    );
  }
}
