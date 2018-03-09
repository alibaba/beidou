import React, { Component } from 'react';
import { message, Button, Row, Col } from 'antd';
import { Section } from '../layout';

const info = () => {
  message.info('This is a normal message');
};

const success = () => {
  message.success('This is a message of success');
};

const error = () => {
  message.error('This is a message of error');
};

const warning = () => {
  message.warning('This is message of warning');
};

const success2 = () => {
  message.success(
    'This is a prompt message for success, and it will disappear in 10 seconds',
    10
  );
};

const success3 = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

export default class MessageDemo extends Component {
  state = {};

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本提示">
                <Button type="primary" onClick={info}>
                  Display normal message
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="修改延时">
                <Button onClick={success2}>Customized display duration</Button>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="其他提示类型">
                <Button onClick={success}>Success</Button>
                <Button onClick={error}>Error</Button>
                <Button onClick={warning}>Warning</Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="加载中">
                <Button onClick={success3}>Display a loading indicator</Button>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
