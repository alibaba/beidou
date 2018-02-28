import React from 'react';

const leaf = <div>test performance</div>;

export default class RecursiveDivs extends React.Component {
  render() {
    const { depth, breadth } = this.props;

    if (depth <= 0) {
      return leaf;
    }

    const children = [];
    for (let i = 0; i < breadth; i++) {
      children.push(
        <RecursiveDivs key={i} depth={depth - 1} breadth={breadth} />
      );
    }
    return <div>{children}</div>;
  }
}
