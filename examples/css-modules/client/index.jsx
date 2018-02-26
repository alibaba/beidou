import 'babel-polyfill';
import React from 'react';

/**
 * @export
 * @class Index
 * @extends {React.Component}
 */
export default class Index extends React.Component {
  render() {
    return (
      <h3>This is index page, go to <a href="/example">example page</a></h3>
    );
  }
}
