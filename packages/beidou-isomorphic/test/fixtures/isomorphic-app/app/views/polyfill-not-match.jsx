import React, { Component } from 'react';

class Comp extends Component {

  render() {
    try {
      return (
        <div>
          <div>{`href: ${location.href}`}</div>
          <div>{`pathname: ${location.pathname}`}</div>
          <div>{`search: ${location.search}`}</div>
        </div>
      );
    } catch (e) {
      return <div>Not Match</div>;
    }
  }
}
export default Comp;
