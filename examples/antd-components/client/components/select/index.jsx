'use strict';

import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import { Section } from '../../layout';
import Search from './search';
import Size from './size';
import Cascade from './cascade';
import User from './user';

import './index.less';

const { Option, OptGroup } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

export default class Demo extends Component {
  state = {
    options: [],
  };
  handleChange = (value) => {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ options });
  };
  render() {
    return (
      <div id="components-select-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本使用">
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    allowClear
                    disabled
                  >
                    <Option value="lucy">Lucy</Option>
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="带搜索框">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="标签">
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                  >
                    {children}
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="分组">
                  <Select
                    defaultValue="lucy"
                    style={{ width: 200 }}
                    onChange={handleChange}
                  >
                    <OptGroup label="Manager">
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                    </OptGroup>
                    <OptGroup label="Engineer">
                      <Option value="Yiminghe">yiminghe</Option>
                    </OptGroup>
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="搜索框">
                  <Search />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自动分词">
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    tokenSeparators={[',']}
                  >
                    {children}
                  </Select>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="三种大小">
                  <Size />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="多选">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                  >
                    {children}
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="智能提示">
                  <Select
                    mode="combobox"
                    style={{ width: 200 }}
                    onChange={this.handleChange}
                    filterOption={false}
                    placeholder="Enter the account name"
                  >
                    {this.state.options}
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="联动">
                  <Cascade />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="获得选项的文本">
                  <Select
                    labelInValue
                    defaultValue={{ key: 'lucy' }}
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    <Option value="jack">Jack (100)</Option>
                    <Option value="lucy">Lucy (101)</Option>
                  </Select>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="搜索用户">
                  <User />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
