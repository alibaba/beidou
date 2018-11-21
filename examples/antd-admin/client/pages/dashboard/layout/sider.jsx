import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Icon, Switch } from 'antd';
import logo from 'client/assets/logo.png';
import Menus from './menu';

import actions from '../actions';

import style from './sider.module.less';

const cx = classNames.bind(style);

const Sider = ({ dispatch, siderFolded, theme, location }) => (
  <aside
    className={cx('sider', { fold: siderFolded, light: theme === 'light' })}
  >
    <div className={cx('logo')}>
      <img alt={'logo'} src={logo} />
      <span>Antd Admin</span>
    </div>
    <Menus
      theme={theme}
      location={location}
      siderFolded={siderFolded}
      className={cx('menu')}
    />
    {!siderFolded && (
      <div className={cx('switchtheme')}>
        <span>
          <Icon type="bulb" />
          Switch Theme
        </span>
        <Switch
          defaultChecked={false}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          onChange={checked =>
            dispatch(actions.common.toggleTheme(checked ? 'dark' : 'light'))
          }
        />
      </div>
    )}
  </aside>
);

export default connect(state => state.common)(Sider);
