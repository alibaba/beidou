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
  
  render() {
    const { helper } = this.props;
    return (
      <html>
        <head>
          <title>Unittest</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: helper.asset('/unit.css') }} />
        </body>
      </html>
    );
  }
}
