'use strict';

import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, StaticRouter, Route, Link } from 'react-router-dom';
import util from '../util';

const MenuItemGroup = Menu.ItemGroup;
const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const { Header, Footer, Sider, Content } = Layout;

const configs = util.listComponents();
const components = [];
configs.forEach((config) => {
  config.list.forEach((item) => {
    components.push(item);
  });
});
export default props => (
  <Router {...props}>
    <Layout>
      <Sider className="sider">
        <div className="brand">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="antd"
          />
          Ant Design
        </div>
        <Menu theme="dark" mode="inline">
          {configs.map(item => (
            <MenuItemGroup key={item.title} title={item.title}>
              {item.list.map(m => (
                <Menu.Item key={m.name}>
                  <Link className="nav-link" to={`/${m.name}`}>
                    {m.title}
                  </Link>
                </Menu.Item>
              ))}
            </MenuItemGroup>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header className="header">
          <h1 className="page-title">AntD Components</h1>
        </Header>
        <Content className="content">
          <div style={{ padding: 24, background: '#fff' }}>
            {components.map((item) => {
              const Comp = item.value;
              return (
                <Route
                  key={item.name}
                  exact
                  path={`/${item.name}`}
                  component={Comp}
                />
              );
            })}
          </div>
        </Content>
        <Footer className="footer">Antd components rendered by beidou</Footer>
      </Layout>
    </Layout>
  </Router>
);
