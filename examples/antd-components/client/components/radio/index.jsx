'use strict';

import React, { Component } from 'react';
import { Row, Col, Radio, Button, Input } from 'antd';
import { Section } from '../../layout';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

export default class Demo extends Component {
  state = {
    value: 1,
    value1: 'Apple',
    value2: 'Apple',
    value3: 'Apple',
    disabled: true,
  };

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onChange1 = (e) => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = (e) => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      value2: e.target.value,
    });
  };

  onChange3 = (e) => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Radio>Radio</Radio>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="单选组合">
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                  </RadioGroup>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="RadioGroup 组合 - 配置方式">
                  <RadioGroup
                    options={plainOptions}
                    onChange={this.onChange1}
                    value={this.state.value1}
                  />
                  <RadioGroup
                    options={options}
                    onChange={this.onChange2}
                    value={this.state.value2}
                  />
                  <RadioGroup
                    options={optionsWithDisabled}
                    onChange={this.onChange3}
                    value={this.state.value3}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="大小">
                  <div>
                    <RadioGroup defaultValue="a" size="large">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b">Shanghai</RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <RadioGroup defaultValue="a">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b">Shanghai</RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <RadioGroup defaultValue="a" size="small">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b">Shanghai</RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="不可用">
                  <Radio defaultChecked={false} disabled={this.state.disabled}>
                    Disabled
                  </Radio>
                  <br />
                  <Radio defaultChecked disabled={this.state.disabled}>
                    Disabled
                  </Radio>
                  <div style={{ marginTop: 20 }}>
                    <Button type="primary" onClick={this.toggleDisabled}>
                      Toggle disabled
                    </Button>
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="RadioGroup 垂直">
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={1}>
                      Option A
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      Option B
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      Option C
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      More...
                      {this.state.value === 4 ? (
                        <Input style={{ width: 100, marginLeft: 10 }} />
                      ) : null}
                    </Radio>
                  </RadioGroup>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="按钮样式">
                  <div>
                    <RadioGroup onChange={onChange} defaultValue="a">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b">Shanghai</RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <RadioGroup onChange={onChange} defaultValue="a">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b" disabled>
                        Shanghai
                      </RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <RadioGroup disabled onChange={onChange} defaultValue="a">
                      <RadioButton value="a">Hangzhou</RadioButton>
                      <RadioButton value="b">Shanghai</RadioButton>
                      <RadioButton value="c">Beijing</RadioButton>
                      <RadioButton value="d">Chengdu</RadioButton>
                    </RadioGroup>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
