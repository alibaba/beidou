import * as React from 'react';
import { Nav } from '@alifd/next';
import cls from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import style from './index.m.scss';
import { IStore } from '../../store';

const cx = cls.bind(style);

const { Item } = Nav;

const header = <span className={cx('logo')}>Demo</span>;

const items = [
  {
    key: 'home',
    title: '首页',
    link: '/',
  },
  {
    key: 'create',
    title: '创建',
    link: '/create',
  },
];

function currentSelectedKey(path: string) {
  const keys = [];
  for (const item of items) {
    if (path === item.link) {
      keys.push(item.key);
    }
  }
  return keys;
}

interface INavProps extends IStore {

}

@inject('router')
@observer
class Navigation extends React.Component<INavProps> {
  render() {
    const { router } = this.props;
    const { location } = router;
    return (
      <div className={cx('nav')}>
        <Nav
          direction="hoz"
          type="line"
          header={header}
          selectedKeys={currentSelectedKey(location.pathname)}
        >
          {items.map(({ key, title, link }) => (
            <Item key={key}>
              <Link to={link}>{title}</Link>
            </Item>
          ))}
        </Nav>
      </div>
    );
  }
}

export default Navigation;
