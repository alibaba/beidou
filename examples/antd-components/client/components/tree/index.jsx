'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';
import Basic from './basic';
import Drag from './drag';
import Search from './search';
import Async from './async';
import Line from './line';
import Controlled from './controlled';

export default class Demo extends Component {
  render() {
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Basic />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="拖动示例">
                  <Drag />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="可搜索">
                  <Search />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="受控操作示例">
                  <Controlled />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="异步数据加载">
                  <Async />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="连接线">
                  <Line />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
