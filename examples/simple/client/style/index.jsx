import React from 'react';

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
    const { helper } = this.props;
    return (
      <html>
        <head>
          <title>Styling</title>
          <link rel="stylesheet" href={helper.asset('style.css')} />
        </head>
        <body>
          <h1 className="title">Styling Page</h1>
          <p>
            Static page template in `/client/static/index.jsx`, visit via url
            `/static`
          </p>
          <p>CSS file serve at `/build/static.css`</p>
        </body>
      </html>
    );
  }
}
