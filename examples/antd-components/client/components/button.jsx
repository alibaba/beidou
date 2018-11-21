'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Radio, Icon, Menu, Dropdown } from 'antd';
import { Section } from '../layout';

const ButtonGroup = Button.Group;

export default class Demo extends Component {
  state = {
    size: 'large',
    loading: false,
    iconLoading: false,
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  handleMenuClick = (e) => {
    console.log('click', e);
  };

  render() {
    const { size } = this.state;
    return (
      <div id="components-button-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="按钮类型">
                  <Button type="primary">Primary</Button>
                  <Button>Default</Button>
                  <Button type="dashed">Dashed</Button>
                  <Button type="danger">Danger</Button>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="按钮尺寸">
                  <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                  </Radio.Group>
                  <br />
                  <br />
                  <Button type="primary" size={size}>
                    Primary
                  </Button>
                  <Button size={size}>Normal</Button>
                  <Button type="dashed" size={size}>
                    Dashed
                  </Button>
                  <Button type="danger" size={size}>
                    Danger
                  </Button>
                  <br />
                  <Button
                    type="primary"
                    shape="circle"
                    icon="download"
                    size={size}
                  />
                  <Button type="primary" icon="download" size={size}>
                    Download
                  </Button>
                  <br />
                  <Button.Group size={size}>
                    <Button type="primary">
                      <Icon type="left" />
                      Backward
                    </Button>
                    <Button type="primary">
                      Forward
                      <Icon type="right" />
                    </Button>
                  </Button.Group>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="加载中状态">
                  <Button type="primary" loading>
                    Loading
                  </Button>
                  <Button type="primary" size="small" loading>
                    Loading
                  </Button>
                  <br />
                  <Button
                    type="primary"
                    loading={this.state.loading}
                    onClick={this.enterLoading}
                  >
                    Click me!
                  </Button>
                  <Button
                    type="primary"
                    icon="poweroff"
                    loading={this.state.iconLoading}
                    onClick={this.enterIconLoading}
                  >
                    Click me!
                  </Button>
                  <br />
                  <Button shape="circle" loading />
                  <Button type="primary" shape="circle" loading />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="按钮组合">
                  <h4>Basic</h4>
                  <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button>OK</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button disabled>L</Button>
                    <Button disabled>M</Button>
                    <Button disabled>R</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button>L</Button>
                    <Button>M</Button>
                    <Button>R</Button>
                  </ButtonGroup>

                  <h4>With Icon</h4>
                  <ButtonGroup>
                    <Button type="primary">
                      <Icon type="left" />
                      Go back
                    </Button>
                    <Button type="primary">
                      Go forward
                      <Icon type="right" />
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button type="primary" icon="cloud" />
                    <Button type="primary" icon="cloud-download" />
                  </ButtonGroup>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="图标按钮">
                  <Button type="primary" shape="circle" icon="search" />
                  <Button type="primary" icon="search">
                    Search
                  </Button>
                  <Button shape="circle" icon="search" />
                  <Button icon="search">Search</Button>
                  <br />
                  <Button shape="circle" icon="search" />
                  <Button icon="search">Search</Button>
                  <Button type="dashed" shape="circle" icon="search" />
                  <Button type="dashed" icon="search">
                    Search
                  </Button>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="不可用状态">
                  <Button type="primary">Primary</Button>
                  <Button type="primary" disabled>
                    Primary(disabled)
                  </Button>
                  <br />
                  <Button>Default</Button>
                  <Button disabled>Default(disabled)</Button>
                  <br />
                  <Button>Ghost</Button>
                  <Button disabled>Ghost(disabled)</Button>
                  <br />
                  <Button type="dashed">Dashed</Button>
                  <Button type="dashed" disabled>
                    Dashed(disabled)
                  </Button>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="多个按钮组合">
                  <div>
                    <Button type="primary">primary</Button>
                    <Button>secondary</Button>
                    <Dropdown
                      overlay={
                        <Menu onClick={this.handleMenuClick}>
                          <Menu.Item key="1">1st item</Menu.Item>
                          <Menu.Item key="2">2nd item</Menu.Item>
                          <Menu.Item key="3">3rd item</Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        Actions <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="幽灵按钮">
                  <div
                    style={{
                      background: 'rgb(190, 200, 200)',
                      padding: '26px 16px 16px',
                    }}
                  >
                    <Button type="primary" ghost>
                      Primary
                    </Button>
                    <Button ghost>Default</Button>
                    <Button type="dashed" ghost>
                      Dashed
                    </Button>
                    <Button type="danger" ghost>
                      danger
                    </Button>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
