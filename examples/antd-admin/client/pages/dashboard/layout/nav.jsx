import React from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Menu, Icon, Popover } from 'antd';
import Menus from './menu';
import style from './nav.module.less';

const cx = classNames.bind(style);
const { SubMenu } = Menu;

const Nav = ({ siderFolded, onFade, location }) => (
  <div className={cx('header')}>
    <div className={cx('button', 'fold-btn')} onClick={onFade}>
      <Icon type={siderFolded ? 'menu-unfold' : 'menu-fold'} />
    </div>
    <Popover
      placement="bottomLeft"
      overlayClassName={cx('popovermenu')}
      trigger="click"
      content={<Menus location={location} />}
    >
      <div className={cx('button', 'menu-btn')}>
        <Icon type="bars" />
      </div>
    </Popover>
    <div className={cx('rightWarpper')}>
      <div className={cx('button')}>
        <Icon type="mail" />
      </div>
      <Menu mode="horizontal">
        <SubMenu
          style={{
            float: 'right',
          }}
          title={
            <span>
              <Icon type="user" />
              Gray
            </span>
          }
        >
          <Menu.Item key="logout">
            <a
              href={`/logout?r=${encodeURIComponent(
                location.pathname + location.search
              )}`}
            >
              Sign out
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  </div>
);

export default connect(state => state.common)(Nav);
