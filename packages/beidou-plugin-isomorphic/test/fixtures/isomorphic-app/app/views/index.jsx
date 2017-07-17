import React, { Component } from 'react';

class Comp extends Component {

  render() {
    document.addEventListener('click', () => {});
    window.setTimeout(() => {}, 1000);
    return <div>123456</div>;
  }
}
export default Comp;
