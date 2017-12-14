import React from 'react';
import classNames from 'classnames/bind';
import style from './index.scss';
import bg from '../images/bg.png';

const cx = classNames.bind(style);

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={cx('page')}>
        <h3>This is example page, back to <a href="/">index page</a></h3>
        <img className={cx('bg')} src={bg} alt="bg" />
      </div>
    );
  }
}
