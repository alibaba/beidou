'use strict';

import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, StaticRouter, Route, Link } from 'react-router-dom';
import util from '../util';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;
const { Header, Footer, Sider, Content } = Layout;

const components = util.listComponents();
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
          {components.map(item => (
            <Menu.Item key={item.name}>
              <Link className="nav-link" to={`/${item.name}`}>
                <Icon type="link" />
                {item.title}
              </Link>
            </Menu.Item>
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
