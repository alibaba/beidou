'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Menu, Dropdown, Icon, message } from 'antd';
import { Section } from '../layout';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

export default class Demo extends Component {
  state = {
    visible: false,
  };

  handleMenuClick = (e) => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    const clickMenu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    const hideMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
        <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
        <Menu.Item key="3">Clicking me will close the menu</Menu.Item>
      </Menu>
    );

    return (
      <div id="components-dropdown-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.alipay.com/"
                          >
                            1st menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.taobao.com/"
                          >
                            2nd menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.tmall.com/"
                          >
                            3rd menu item
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <a className="ant-dropdown-link" href="#">
                      Hover me <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="其他元素">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="0">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.alipay.com/"
                          >
                            1st menu item
                          </a>
                        </Menu.Item>
                        <Menu.Item key="1">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.taobao.com/"
                          >
                            2nd menu item
                          </a>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3" disabled>
                          3rd menu item（disabled）
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <a className="ant-dropdown-link" href="#">
                      Hover me <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="触发事件">
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={({ key }) => {
                          message.info(`Click on item ${key}`);
                        }}
                      >
                        <Menu.Item key="1">1st menu item</Menu.Item>
                        <Menu.Item key="2">2nd memu item</Menu.Item>
                        <Menu.Item key="3">3rd menu item</Menu.Item>
                      </Menu>
                    }
                  >
                    <a className="ant-dropdown-link" href="#">
                      Hover me, Click menu item <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="多级菜单">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>1st menu item</Menu.Item>
                        <Menu.Item>2nd menu item</Menu.Item>
                        <Menu.SubMenu title="sub menu">
                          <Menu.Item>3rd menu item</Menu.Item>
                          <Menu.Item>4th menu item</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu title="disabled sub menu" disabled>
                          <Menu.Item>5d menu item</Menu.Item>
                          <Menu.Item>6th menu item</Menu.Item>
                        </Menu.SubMenu>
                      </Menu>
                    }
                  >
                    <a className="ant-dropdown-link" href="#">
                      Cascading menu <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="右键菜单">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1">1st menu item</Menu.Item>
                        <Menu.Item key="2">2nd menu item</Menu.Item>
                        <Menu.Item key="3">3rd menu item</Menu.Item>
                      </Menu>
                    }
                    trigger={['contextMenu']}
                  >
                    <span style={{ userSelect: 'none' }}>
                      Right Click on Me
                    </span>
                  </Dropdown>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="弹出位置" className="placement">
                  <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>bottomLeft</Button>
                  </Dropdown>
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <Button>bottomCenter</Button>
                  </Dropdown>
                  <Dropdown overlay={menu} placement="bottomRight">
                    <Button>bottomRight</Button>
                  </Dropdown>
                  <br />
                  <Dropdown overlay={menu} placement="topLeft">
                    <Button>topLeft</Button>
                  </Dropdown>
                  <Dropdown overlay={menu} placement="topCenter">
                    <Button>topCenter</Button>
                  </Dropdown>
                  <Dropdown overlay={menu} placement="topRight">
                    <Button>topRight</Button>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="触发方式" className="placement">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="0">
                          <a href="http://www.alipay.com/">1st menu item</a>
                        </Menu.Item>
                        <Menu.Item key="1">
                          <a href="http://www.taobao.com/">2nd menu item</a>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3">3rd menu item</Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <a className="ant-dropdown-link" href="#">
                      Click me <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="带下拉框的按钮">
                  <Dropdown.Button
                    onClick={handleButtonClick}
                    overlay={clickMenu}
                  >
                    Dropdown
                  </Dropdown.Button>
                  <Dropdown.Button
                    onClick={handleButtonClick}
                    overlay={clickMenu}
                    disabled
                    style={{ marginLeft: 8 }}
                  >
                    Dropdown
                  </Dropdown.Button>
                  <Dropdown overlay={clickMenu}>
                    <Button style={{ marginLeft: 8 }}>
                      Button <Icon type="down" />
                    </Button>
                  </Dropdown>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="菜单隐藏方式">
                  <Dropdown
                    overlay={hideMenu}
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.visible}
                  >
                    <a className="ant-dropdown-link" href="#">
                      Hover me <Icon type="down" />
                    </a>
                  </Dropdown>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
