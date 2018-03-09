import React, { Component } from 'react';
import { BackTop, Row, Col } from 'antd';
import { Section } from '../layout';

export default class BacktopDemo extends Component {
  state = {};

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <div style={{ height: '900px' }}>
                  <BackTop />
                  Scroll down to see the bottom-right
                  <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>
                    {' '}
                    gray{' '}
                  </strong>
                  button.
                </div>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
