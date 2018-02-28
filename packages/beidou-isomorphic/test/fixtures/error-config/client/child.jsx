import React, { Component } from 'react';

class Child extends Component {
  render() {
    return <div>{`Child-${this.props.data}`}</div>;
  }
}

export default Child;
