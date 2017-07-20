import React from 'react';

/**
 * Static Page Structure
 *
 * export a component class and not invoke `render`,
 * will output component as pure html structure
 *
 * @export
 * @class Test
 * @extends {React.Component}
 */
export default class Test extends React.Component {
  render() {
    return (
      <div>
        <h1>Static Usage</h1>
        <p>export a component class and not invoke `render`, will output component as pure html structure</p>
      </div>
    );
  }
}
