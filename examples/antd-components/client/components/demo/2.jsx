'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';

export default class Demo extends Component {
  render() {
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="">1</Section>
              </Col>
              <Col span={24}>
                <Section title="">1</Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="">2</Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
