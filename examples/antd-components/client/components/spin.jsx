import React, { Component } from 'react';
import { Spin, Row, Col, Alert, Switch } from 'antd';
import { Section } from '../layout';

export default class SpinDemo extends Component {
  state = { loading: false };

  toggle = (value) => {
    this.setState({ loading: value });
  };

  render() {
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    );
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Spin />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="各种大小">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="延迟">
                <div>
                  <Spin spinning={this.state.loading} delay={500}>
                    {container}
                  </Spin>
                  <div style={{ marginTop: 16 }}>
                    Loading state：
                    <Switch
                      checked={this.state.loading}
                      onChange={this.toggle}
                    />
                  </div>
                </div>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
