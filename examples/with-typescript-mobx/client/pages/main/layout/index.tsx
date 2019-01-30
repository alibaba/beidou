import { ViewProps } from 'beidou';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class Layout extends React.Component<ViewProps> {
  static propTypes = {
    title: PropTypes.string,
    helper: PropTypes.object,
  };

  render() {
    const { helper, entry, store } = this.props;
    const htmlString = this.props.children as string;
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href={helper.asset('next.css')} />
          <link rel="stylesheet" href={helper.asset(`${entry}.css`)} />
        </head>
        <body>
          <div
            id="_"
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__STORE__=${store}` }}
          />
          <script src={helper.asset('react.js')} />
          <script src={helper.asset('react-dom.js')} />
          <script src={helper.asset('moment.js')} />
          <script src={helper.asset('next.js')} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset(`${entry}.js`)} />
        </body>
      </html>
    );
  }
}
