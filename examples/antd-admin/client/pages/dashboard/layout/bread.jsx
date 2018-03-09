import React from 'react';
import classNames from 'classnames/bind';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import style from './bread.module.less';

const cx = classNames.bind(style);

const Bread = ({ className, menus, location }) => {
  const map = (items, parent = []) => {
    for (const item of items) {
      if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
        return [...parent, item];
      }
      if (item.items) {
        return map(item.items, [...parent, item]);
      }
    }
    return [];
  };

  const breadItems = map(menus);
  const breads = breadItems.map((item, key) => {
    const content = (
      <span>
        {item.icon ? <Icon type={item.icon} style={{ marginRight: 4 }} /> : ''}
        {item.name}
      </span>
    );
    return (
      <Breadcrumb.Item key={item.route + item.name}>
        {menus.length - 1 !== key && item.route ? (
          <Link to={location.pathname !== item.route ? item.route : '#'}>
            {content}
          </Link>
        ) : (
          content
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={cx(className, 'bread')}>
      <Breadcrumb>{breads}</Breadcrumb>
    </div>
  );
};

export default Bread;
