'use strict';

import React, { Component } from 'react';
import { Row, Col, Checkbox, Button } from 'antd';
import { Section } from '../layout';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
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
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

export default class Demo extends Component {
  state = {
    checked: true,
    disabled: false,
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };
  onChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };
  onChange2 = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };
  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };
  render() {
    const label = `${this.state.checked ? 'Checked' : 'Unchecked'}-${
      this.state.disabled ? 'Disabled' : 'Enabled'
    }`;
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本用法">
                  <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="受控的 Checkbox">
                  <p style={{ marginBottom: '20px' }}>
                    <Checkbox
                      checked={this.state.checked}
                      disabled={this.state.disabled}
                      onChange={this.onChange}
                    >
                      {label}
                    </Checkbox>
                  </p>
                  <p>
                    <Button
                      type="primary"
                      size="small"
                      onClick={this.toggleChecked}
                    >
                      {!this.state.checked ? 'Check' : 'Uncheck'}
                    </Button>
                    <Button
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      size="small"
                      onClick={this.toggleDisable}
                    >
                      {!this.state.disabled ? 'Disable' : 'Enable'}
                    </Button>
                  </p>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="全选">
                  <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                      indeterminate={this.state.indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      Check all
                    </Checkbox>
                  </div>
                  <br />
                  <CheckboxGroup
                    options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange2}
                  />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="不可用">
                  <Checkbox defaultChecked={false} disabled />
                  <br />
                  <Checkbox defaultChecked disabled />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="Checkbox 组">
                  <CheckboxGroup
                    options={plainOptions}
                    defaultValue={['Apple']}
                    onChange={(checkedValues) => {
                      console.log('checked = ', checkedValues);
                    }}
                  />
                  <br />
                  <br />
                  <CheckboxGroup
                    options={options}
                    defaultValue={['Pear']}
                    onChange={(checkedValues) => {
                      console.log('checked = ', checkedValues);
                    }}
                  />
                  <br />
                  <br />
                  <CheckboxGroup
                    options={optionsWithDisabled}
                    disabled
                    defaultValue={['Apple']}
                    onChange={(checkedValues) => {
                      console.log('checked = ', checkedValues);
                    }}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="布局">
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={(checkedValues) => {
                      console.log('checked = ', checkedValues);
                    }}
                  >
                    <Row>
                      <Col span={8}>
                        <Checkbox value="A">A</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="B">B</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="C">C</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="D">D</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">E</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
