'use strict';

import React, { Component } from 'react';
import { Row, Col, Icon, Breadcrumb } from 'antd';
import { Section } from '../layout';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-breadcrumb-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                  </Breadcrumb>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="分隔符">
                  <Breadcrumb separator=">">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                  </Breadcrumb>
                </Section>
              </Col>

            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="带有图标的">
                  <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                      <Icon type="user" />
                      <span>Application List</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
      Application
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
