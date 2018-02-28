import React from 'react';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  render() {
    // const { helper } = this.props;
    return (
      <html>
        <head>
          <title>Static</title>
        </head>
        <body>
          <h1 className="title">Static Page</h1>
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
