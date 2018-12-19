import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Timing from './timing';
import './index.less';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static getInitialProps(ctx) {
    const { stream } = ctx.request.query;
    return { stream };
  }

  render() {
    const { helper, Render, stream } = this.props;
    const streams = [...new Array(10)].map((v, i) => (
      <Render id={i} key={i} stream={!!stream} app={<App stream index={i} />} />
    ));
    return (
      <html>
        <head>
          <title>Script</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <h1>RenderToNodeStream Demo</h1>
          <Render id="timing" stream={!!stream}>
            <Timing />
          </Render>
          {streams}
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  ReactDOM.hydrate(<Timing />, document.getElementById('timing'));

  [...new Array(10)].forEach((v, i) => {
    ReactDOM.hydrate(<App stream index={i} />, document.getElementById(i));
  });
}
