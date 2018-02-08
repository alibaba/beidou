import React from 'react';
import classNames from 'classnames/bind';
import style from './index.scss'
import bg from '../images/bg.png';
import ignore from '../images/ignore.png';

const cx = classNames.bind(style);

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      desc: 'css modules'
    });
  }

  render() {
    return (
      <div className={cx('page')}>
        <h3>This is example page, back to <a href="/">index page</a></h3>
        <p>{this.state.desc}</p>
        <img className={cx('bg')} src={bg} alt="bg" />
      </div>
    );
  }
}
