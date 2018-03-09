'use strict';

import React, { Component } from 'react';
import { Row, Col, Timeline, Icon } from 'antd';
import { Section } from '../layout';

export default class Demo extends Component {
  render() {
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本用法">
                  <Timeline>
                    <Timeline.Item>
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Solve initial network problems 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>
                      Network problems being solved 2015-09-01
                    </Timeline.Item>
                  </Timeline>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="最后一个">
                  <Timeline pending="Recording...">
                    <Timeline.Item>
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Solve initial network problems 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  </Timeline>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="圆圈颜色">
                  <Timeline>
                    <Timeline.Item color="green">
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item color="green">
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item color="red">
                      <p>Solve initial network problems 1</p>
                      <p>Solve initial network problems 2</p>
                      <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                  </Timeline>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自定义时间轴点">
                  <Timeline>
                    <Timeline.Item>
                      Create a services site 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Solve initial network problems 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item
                      dot={
                        <Icon
                          type="clock-circle-o"
                          style={{ fontSize: '16px' }}
                        />
                      }
                      color="red"
                    >
                      Technical testing 2015-09-01
                    </Timeline.Item>
                    <Timeline.Item>
                      Network problems being solved 2015-09-01
                    </Timeline.Item>
                  </Timeline>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
