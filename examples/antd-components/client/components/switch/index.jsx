'use strict';

import React, { Component } from 'react';
import { Row, Col, Switch, Icon, Button } from 'antd';
import { Section } from '../../layout';

import './index.less';

function onChange(checked) {
  console.log(`switch to ${checked}`);
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
      <div id="components-switch-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Switch defaultChecked onChange={onChange} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="文字和图标">
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    defaultChecked
                  />
                  <br />
                  <Switch checkedChildren="1" unCheckedChildren="0" />
                  <br />
                  <Switch
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="cross" />}
                    defaultChecked
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="加载中">
                  <Switch loading defaultChecked />
                  <br />
                  <Switch size="small" loading />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="不可用">
                  <Switch disabled={this.state.disabled} defaultChecked />
                  <br />
                  <Button type="primary" onClick={this.toggle}>
                    Toggle disabled
                  </Button>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="两种大小">
                  <Switch defaultChecked />
                  <br />
                  <Switch size="small" defaultChecked />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
