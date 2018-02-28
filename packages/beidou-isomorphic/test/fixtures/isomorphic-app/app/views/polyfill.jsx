import React, { Component } from 'react';

class Comp extends Component {
  render() {
    // document.addEventListener('click', () => {});
    // window.setTimeout(() => {}, 1000);
    return (
      <div>
        <div>{`href: ${location.href}`}</div>
        <div>{`pathname: ${location.pathname}`}</div>
        <div>{`search: ${location.search}`}</div>
      </div>
    );
  }
}
export default Comp;
