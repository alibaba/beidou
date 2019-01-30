import { ViewProps } from 'beidou';
import * as React from 'react';
import PropTypes from 'prop-types';

export default class Layout extends React.Component<ViewProps> {
  static propTypes = {
    title: PropTypes.string,
    helper: PropTypes.object,
  };

  render() {
    const { helper, entry } = this.props;
    const htmlString = this.props.children as string;
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href={helper.asset(`${entry}.css`)} />
        </head>
        <body>
          <div
            id="_"
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset(`${entry}.js`)} />
        </body>
      </html>
    );
  }
}
