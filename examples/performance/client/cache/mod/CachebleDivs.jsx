import React from 'react';

export default class CachebleDivs extends React.Component {
  render() {
    const { depth, breadth } = this.props;

    if (depth <= 0) {
      return <div>{`depth: ${depth}, breadth: ${breadth}`}</div>;
    }

    const children = [];
    for (let i = 0; i < breadth; i++) {
      children.push(<CachebleDivs key={i} depth={depth - 1} breadth={breadth} />);
    }
    return <div>{children}</div>;
  }
}
