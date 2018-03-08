'use strict';

import React, { Component } from 'react';
import { Row, Col, Icon, Menu, Button, Switch } from 'antd';
import { Section } from '../layout';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Demo extends Component {
  state = {
    collapsed: false,
    theme: 'dark',
    current: '1',
  };

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick = (e) => {
    console.log('click ', e);
  };

  render() {
    return (
      <div id="components-menu-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="顶部导航">
              <Menu onClick={this.handleClick} mode="horizontal">
                <Menu.Item key="mail">
                  <Icon type="mail" />Navigation One
                </Menu.Item>
                <Menu.Item key="app" disabled>
                  <Icon type="appstore" />Navigation Two
                </Menu.Item>
                <SubMenu
                  title={
                    <span>
                      <Icon type="setting" />Navigation Three - Submenu
                    </span>
                  }
                >
                  <MenuItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                  <a
                    href="https://ant.design"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Navigation Four - Link
                  </a>
                </Menu.Item>
              </Menu>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="内嵌菜单">
              <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Navigation One</span>
                    </span>
                  }
                >
                  <MenuItemGroup key="g1" title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup key="g2" title="Item 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Navigation Two</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="setting" />
                      <span>Navigation Three</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </Section>
          </Col>

          <Col>
            <Section title="缩起内嵌菜单">
              <div style={{ width: 256 }}>
                <Button
                  type="primary"
                  onClick={this.toggleCollapsed}
                  style={{ marginBottom: 16 }}
                >
                  <Icon
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  />
                </Button>
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="inbox" />
                    <span>Option 3</span>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                      </span>
                    }
                  >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                      <Menu.Item key="11">Option 11</Menu.Item>
                      <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                </Menu>
              </div>
            </Section>
          </Col>

          <Col>
            <Section title="只展开当前父级菜单">
              <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Navigation One</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Navigation Two</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="setting" />
                      <span>Navigation Three</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </Section>
          </Col>

          <Col>
            <Section title="垂直菜单">
              <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                mode="vertical"
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Navigation One</span>
                    </span>
                  }
                >
                  <MenuItemGroup title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title="Iteom 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Navigation Two</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="setting" />
                      <span>Navigation Three</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </Section>
          </Col>

          <Col>
            <Section title="主题">
              <div>
                <Switch
                  checked={this.state.theme === 'dark'}
                  onChange={this.changeTheme}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                  theme={this.state.theme}
                  onClick={this.handleClick}
                  style={{ width: 256 }}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[this.state.current]}
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="appstore" />
                        <span>Navigtion Two</span>
                      </span>
                    }
                  >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                      <Menu.Item key="7">Option 7</Menu.Item>
                      <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        <Icon type="setting" />
                        <span>Navigation Three</span>
                      </span>
                    }
                  >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
