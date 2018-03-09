import React, { Component } from 'react';
import { TimePicker, Row, Col, Button } from 'antd';
import moment from 'moment';
import { Section } from '../layout';

function onChange(time, timeString) {
  console.log(time, timeString);
}

export default class TimePickerDemo extends Component {
  state = {
    value: null,
    open: false,
  };

  onChange = (time) => {
    console.log(time);
    this.setState({ value: time });
  };

  handleOpenChange = (open) => {
    this.setState({ open });
  };

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <TimePicker
                  onChange={onChange}
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="三种大小">
                <TimePicker
                  defaultValue={moment('12:08:23', 'HH:mm:ss')}
                  size="large"
                />
                <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />
                <TimePicker
                  defaultValue={moment('12:08:23', 'HH:mm:ss')}
                  size="small"
                />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="选择时分">
                <TimePicker
                  defaultValue={moment('12:08', 'HH:mm')}
                  format="HH:mm"
                />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="附加内容">
                <TimePicker
                  open={this.state.open}
                  onOpenChange={this.handleOpenChange}
                  addon={() => (
                    <Button
                      size="small"
                      type="primary"
                      onClick={this.handleClose}
                    >
                      Ok
                    </Button>
                  )}
                />
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="受控组件">
                <TimePicker value={this.state.value} onChange={this.onChange} />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="禁用">
                <TimePicker
                  defaultValue={moment('12:08:23', 'HH:mm:ss')}
                  disabled
                />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="步长选项">
                <TimePicker minuteStep={15} secondStep={10} />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="12 小时制">
                <TimePicker use12Hours onChange={onChange} />
                <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
                <TimePicker use12Hours format="h:mm a" onChange={onChange} />
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
