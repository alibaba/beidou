'use strict';

import React, { Component } from 'react';
import { Row, Col, Rate, Icon } from 'antd';
import { Section } from '../../layout';

export default class Demo extends Component {
  state = {
    value: 3,
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Rate />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="文案展现">
                  <Rate onChange={this.handleChange} value={value} />
                  {value && (
                    <span className="ant-rate-text">{value} stars</span>
                  )}
                </Section>
              </Col>
              <Col span={24}>
                <Section title="清除">
                  <Rate defaultValue={3} /> allowClear: true
                  <br />
                  <Rate allowClear={false} defaultValue={3} /> allowClear: false
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="半星">
                  <Rate allowHalf defaultValue={2.5} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="只读">
                  <Rate disabled defaultValue={2} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="其他字符">
                  <Rate character={<Icon type="heart" />} allowHalf />
                  <br />
                  <Rate character="A" allowHalf style={{ fontSize: 36 }} />
                  <br />
                  <Rate character="好" allowHalf />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
