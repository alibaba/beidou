'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';
import Basic from './basic';
import Disable from './disable';
import Custom from './custom';
import Size from './size';
import Search from './search';
import Default from './default';
import Expand from './expand';
import Feedback from './feedback';
import Options from './options';
import Dynamic from './dynamic';

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
                <Section title="可以自定义显示">
                  <Custom />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="禁用选项">
                  <Disable />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="大小">
                  <Size />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="搜索">
                  <Search />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="默认值">
                  <Default />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="移入展开">
                  <Expand />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="选择即改变">
                  <Feedback />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="自定义已选项">
                  <Options />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="动态加载选项">
                  <Dynamic />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
