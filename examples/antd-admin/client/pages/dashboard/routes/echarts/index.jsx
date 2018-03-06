import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import style from './index.module.less';

const cx = classNames.bind(style);

const Dashboard = () => <div className={cx('echarts')}>echarts</div>;

export default connect(state => state)(Dashboard);
