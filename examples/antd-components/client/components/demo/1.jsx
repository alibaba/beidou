'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-affix-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="">1</Section>
          </Col>
        </Row>
      </div>
    );
  }
}
