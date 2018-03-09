'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Affix } from 'antd';
import { Section } from '../layout';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-affix-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Affix>
                    <Button type="primary">Affix top</Button>
                  </Affix>
                  <br />
                  <Affix offsetBottom={0}>
                    <Button type="primary">Affix bottom</Button>
                  </Affix>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="滚动容器">
                  <div className="background">
                    <Affix target={() => this.container}>
                      <Button type="primary">
                        Fixed at the top of container
                      </Button>
                    </Affix>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="固定状态改变的回调">
                  <Affix
                    offsetTop={120}
                    onChange={affixed => console.log(affixed)}
                  >
                    <Button>120px to affix top</Button>
                  </Affix>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
