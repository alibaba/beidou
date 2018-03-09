'use strict';

import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import { Section } from '../layout';

import './layout.less';

const { Header, Footer, Sider, Content } = Layout;

export default class Demo extends Component {
  render() {
    return (
      <div id="components-layout-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本">
              <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
              </Layout>

              <Layout>
                <Header>Header</Header>
                <Layout>
                  <Sider>Sider</Sider>
                  <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
              </Layout>

              <Layout>
                <Header>Header</Header>
                <Layout>
                  <Content>Content</Content>
                  <Sider>Sider</Sider>
                </Layout>
                <Footer>Footer</Footer>
              </Layout>

              <Layout>
                <Sider>Sider</Sider>
                <Layout>
                  <Header>Header</Header>
                  <Content>Content</Content>
                  <Footer>Footer</Footer>
                </Layout>
              </Layout>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
