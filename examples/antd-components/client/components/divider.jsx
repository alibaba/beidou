import React, { Component } from 'react';
import { Divider, Row, Col } from 'antd';
import { Section } from '../layout';

export default class DividerDemo extends Component {
  state = {};

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nonne merninisti licere mihi ista probare, quae sunt a te
                    dicta? Refert tamen, quo modo.
                  </p>
                  <Divider />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nonne merninisti licere mihi ista probare, quae sunt a te
                    dicta? Refert tamen, quo modo.
                  </p>
                  <Divider>With Text</Divider>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nonne merninisti licere mihi ista probare, quae sunt a te
                    dicta? Refert tamen, quo modo.
                  </p>
                  <Divider dashed />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nonne merninisti licere mihi ista probare, quae sunt a te
                    dicta? Refert tamen, quo modo.
                  </p>
                </div>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="垂直分割线">
                <div>
                  Text
                  <Divider type="vertical" />
                  <a href="#">Link</a>
                  <Divider type="vertical" />
                  <a href="#">Link</a>
                </div>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
