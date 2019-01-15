import React from 'react';
import { hot } from 'react-hot-loader';
import classNames from 'classnames/bind';
import style from './index.module.less';
import bg from '../images/bg.png';

const cx = classNames.bind(style);

class Example extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={cx('page')}>
        <h3>
          This is example page, back to <a href="/">index page</a>
        </h3>
        <img className={cx('bg')} src={bg} alt="bg" />
      </div>
    );
  }
}

export default hot(module)(Example);
