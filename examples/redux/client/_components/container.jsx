import React from 'react';
import classNames from 'classnames/bind';
import style from './index.scss';

const cx = classNames.bind(style);

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={cx('page')}>
        <h2>Redux Example</h2>
      </div>
    );
  }
}
