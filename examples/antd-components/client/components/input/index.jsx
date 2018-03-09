'use strict';

import React, { Component } from 'react';
import { Row, Col, Input, Select, Icon } from 'antd';
import { Section } from '../../layout';
import Suffix from './suffix';
import Compact from './compact';
import Format from './format';
import './index.less';

const Option = Select.Option;
const { TextArea, Search } = Input;

export default class Demo extends Component {
  render() {
    return (
      <div id="components-input-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本使用">
                  <Input placeholder="Basic usage" />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="前置/后置标签">
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      addonBefore="Http://"
                      addonAfter=".com"
                      defaultValue="mysite"
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      addonBefore={
                        <Select defaultValue="Http://" style={{ width: 90 }}>
                          <Option value="Http://">Http://</Option>
                          <Option value="Https://">Https://</Option>
                        </Select>
                      }
                      addonAfter={
                        <Select defaultValue=".com" style={{ width: 80 }}>
                          <Option value=".com">.com</Option>
                          <Option value=".jp">.jp</Option>
                          <Option value=".cn">.cn</Option>
                          <Option value=".org">.org</Option>
                        </Select>
                      }
                      defaultValue="mysite"
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Input
                      addonAfter={<Icon type="setting" />}
                      defaultValue="mysite"
                    />
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="搜索框">
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                  />
                  <br />
                  <br />
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                  <br />
                  <br />
                  <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="适应文本高度的文本域">
                  <TextArea
                    placeholder="Autosize height based on content lines"
                    autosize
                  />
                  <div style={{ margin: '24px 0' }} />
                  <TextArea
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autosize={{ minRows: 2, maxRows: 6 }}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="前缀和后缀">
                  <Suffix />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="三种大小">
                  <div className="example-input">
                    <Input size="large" placeholder="large size" />
                    <Input placeholder="default size" />
                    <Input size="small" placeholder="small size" />
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="输入框组合">
                  <Compact />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="文本域">
                  <TextArea rows={4} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="输入时格式化展示">
                  <Format />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
