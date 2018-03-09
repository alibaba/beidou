import React, { Component } from 'react';
import { notification, Button, Row, Col, Icon, Select } from 'antd';
import { Section } from '../layout';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. ' +
      'This is the content of the notification. ' +
      'This is the content of the notification.',
  });
};

const openNotification2 = () => {
  const args = {
    message: 'Notification Title',
    description:
      'I will never close automatically. ' +
      'I will never close automatically. ' +
      'I will never close automatically.',
    duration: 0,
  };
  notification.open(args);
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. ' +
      'This is the content of the notification. ' +
      'This is the content of the notification.',
  });
};

const openNotification3 = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. ' +
      'This is the content of the notification. ' +
      'This is the content of the notification.',
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};

const close = () => {
  console.log(
    'Notification was closed. Either the close ' +
      'button was clicked or duration time elapsed.'
  );
};

const openNotification4 = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Notification Title',
    description:
      'A function will be be called after the notification ' +
      'is closed (automatically after the "duration" time of manually).',
    btn,
    key,
    onClose: close,
  });
};

const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const openNotification5 = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. ' +
      'This is the content of the notification. ' +
      'This is the content of the notification.',
  });
};

export default class NotificationDemo extends Component {
  state = {};

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本提示">
                <Button type="primary" onClick={openNotification}>
                  Open the notification box
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="带有图标的通知提醒框">
                <Button onClick={() => openNotificationWithIcon('success')}>
                  Success
                </Button>
                <Button onClick={() => openNotificationWithIcon('info')}>
                  Info
                </Button>
                <Button onClick={() => openNotificationWithIcon('warning')}>
                  Warning
                </Button>
                <Button onClick={() => openNotificationWithIcon('error')}>
                  Error
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义位置">
                <Select
                  defaultValue="topRight"
                  style={{ width: 120, marginRight: 10 }}
                  onChange={(val) => {
                    notification.config({
                      placement: val,
                    });
                  }}
                >
                  {options.map(val => (
                    <Option key={val} value={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
                <Button type="primary" onClick={openNotification5}>
                  Open the notification box
                </Button>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="自动关闭的延时">
                <Button type="primary" onClick={openNotification2}>
                  Open the notification box
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义图标">
                <Button type="primary" onClick={openNotification3}>
                  Open the notification box
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义按钮">
                <Button type="primary" onClick={openNotification4}>
                  Open the notification box
                </Button>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
