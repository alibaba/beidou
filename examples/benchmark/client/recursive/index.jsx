import React from 'react';
import classnames from 'classnames/bind';
import style from './style.module.less';

const cx = classnames.bind(style);

const leaf = <div className={cx('leaf')}>Recursive Leaf</div>;


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
    return <div className={cx('recursive')}>{children}</div>;
  }
}
