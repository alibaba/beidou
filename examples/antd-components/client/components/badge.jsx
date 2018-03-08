'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Badge, Icon, Switch } from 'antd';
import { Section } from '../layout';

const ButtonGroup = Button.Group;

export default class Demo extends Component {
  state = {
    count: 5,
    show: true,
  };

  onChange = (show) => {
    this.setState({ show });
  };

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };


  render() {
    return (
      <div id="components-badge-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Badge count={5}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <Badge count={0} showZero>
                    <a href="#" className="head-example" />
                  </Badge>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="封顶数字">
                  <Badge count={99}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <Badge count={100}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <Badge count={99} overflowCount={10}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <Badge count={1000} overflowCount={999}>
                    <a href="#" className="head-example" />
                  </Badge>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="可点击">
                  <a href="#">
                    <Badge count={5}>
                      <span className="head-example" />
                    </Badge>
                  </a>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="状态点">
                  <Badge status="success" />
                  <Badge status="error" />
                  <Badge status="default" />
                  <Badge status="processing" />
                  <Badge status="warning" />
                  <br />
                  <Badge status="success" text="Success" />
                  <br />
                  <Badge status="error" text="Error" />
                  <br />
                  <Badge status="default" text="Default" />
                  <br />
                  <Badge status="processing" text="Processing" />
                  <br />
                  <Badge status="warning" text="Warning" />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="独立使用">
                  <Badge count={25} />
                  <Badge
                    count={4}
                    style={{
                      backgroundColor: '#fff',
                      color: '#999',
                      boxShadow: '0 0 0 1px #d9d9d9 inset',
                    }}
                  />
                  <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="讨嫌的小红点">
                  <Badge dot>
                    <Icon type="notification" />
                  </Badge>
                  <Badge count={0} dot>
                    <Icon type="notification" />
                  </Badge>
                  <Badge dot>
                    <a href="#">Link something</a>
                  </Badge>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="动态">
                  <div>
                    <Badge count={this.state.count}>
                      <a href="#" className="head-example" />
                    </Badge>
                    <ButtonGroup>
                      <Button onClick={this.decline}>
                        <Icon type="minus" />
                      </Button>
                      <Button onClick={this.increase}>
                        <Icon type="plus" />
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Badge dot={this.state.show}>
                      <a href="#" className="head-example" />
                    </Badge>
                    <Switch
                      onChange={this.onChange}
                      checked={this.state.show}
                    />
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
