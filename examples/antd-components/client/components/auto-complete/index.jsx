'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';
import './index.less';
import Basic from './basic';
import Custom from './custom';
import Case from './case';
import Options from './options';
import Category from './category';
import Search from './search';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-auto-complete-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本使用">
                  <Basic />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自定义输入组件">
                  <Custom />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="查询模式 - 确定类目">
                  <Category />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="自定义选项">
                  <Options />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="不区分大小写">
                  <Case />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="查询模式 - 不确定类目">
                  <Search />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
