'use strict';

import React, { Component } from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import { Section } from '../../layout';
import './index.less';

function onChange(value) {
  console.log('changed', value);
}

export default class Demo extends Component {
  state = {
    disabled: true,
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    return (
      <div id="components-input-number-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={onChange}
                  />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="">
                  <InputNumber
                    min={1}
                    max={10}
                    disabled={this.state.disabled}
                    defaultValue={3}
                  />
                  <div style={{ marginTop: 20 }}>
                    <Button onClick={this.toggle} type="primary">
                      Toggle disabled
                    </Button>
                  </div>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="格式化展示">
                  <InputNumber
                    defaultValue={1000}
                    formatter={value =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                  />
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={onChange}
                  />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="三种大小">
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={onChange}
                  />
                  <InputNumber
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={onChange}
                  />
                  <InputNumber
                    size="small"
                    min={1}
                    max={100000}
                    defaultValue={3}
                    onChange={onChange}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="小数">
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={onChange}
                  />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
