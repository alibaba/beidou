'use strict';

import React, { Component } from 'react';
import { Row, Col, Mention } from 'antd';
import { Section } from '../../layout';
import Basic from './basic';
import Async from './async';
import Avatar from './avatar';
import Form from './form';
import Parent from './parent';
import Custom from './custom';
import Nav from './nav';
import Controlled from './controlled';
import Readonly from './readonly';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-memtion-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本使用">
                  <Basic />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="异步加载">
                  <Async />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="头像">
                  <Avatar />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="配合 Form 使用">
                  <Form />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="建议渲染父节点">
                  <Parent />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自定义触发字符">
                  <Custom />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="向上展开">
                  {(function () {
                    function onChange(contentState) {
                      console.log(toString(contentState));
                    }

                    function onSelect(suggestion) {
                      console.log('onSelect', suggestion);
                    }
                    return (
                      <Mention
                        style={{ width: '100%' }}
                        onChange={onChange}
                        suggestions={[
                          'afc163',
                          'benjycui',
                          'yiminghe',
                          'RaoHai',
                          '中文',
                          'にほんご',
                        ]}
                        onSelect={onSelect}
                        placement="top"
                      />
                    );
                  }())}
                </Section>
              </Col>

              <Col span={24}>
                <Section title="自定义建议">
                  <Nav />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="受控模式">
                  <Controlled />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="多行">
                  {(function () {
                    const { toString } = Mention;

                    function onChange(editorState) {
                      console.log(toString(editorState));
                    }
                    return (
                      <Mention
                        style={{ width: '100%', height: 100 }}
                        onChange={onChange}
                        suggestions={[
                          'afc163',
                          'benjycui',
                          'yiminghe',
                          'jljsj33',
                          'dqaria',
                          'RaoHai',
                        ]}
                        multiLines
                      />
                    );
                  }())}
                </Section>
              </Col>

              <Col span={24}>
                <Section title="无效或只读">
                  <Readonly />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
