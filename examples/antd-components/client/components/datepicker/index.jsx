'use strict';

import React, { Component } from 'react';
import { Row, Col, DatePicker, Radio } from 'antd';
import moment from 'moment';
import { Section } from '../../layout';
import Custom from './custom';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const dateFormat2 = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

export default class Demo extends Component {
  state = {
    size: 'default',
    mode: 'time',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };
  handleOpenChange = (open) => {
    if (open) {
      this.setState({ mode: 'time' });
    }
  };

  handlePanelChange = (value, mode) => {
    this.setState({ mode });
  };
  render() {
    const { size } = this.state;
    return (
      <div id="components-datepicker-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <DatePicker onChange={onChange} />
                  <br />
                  <MonthPicker onChange={onChange} placeholder="Select month" />
                  <br />
                  <RangePicker onChange={onChange} />
                  <br />
                  <WeekPicker onChange={onChange} placeholder="Select week" />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="">
                  <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                  </Radio.Group>
                  <br />
                  <br />
                  <DatePicker size={size} />
                  <br />
                  <MonthPicker size={size} placeholder="Select Month" />
                  <br />
                  <RangePicker size={size} />
                  <br />
                  <WeekPicker size={size} placeholder="Select Week" />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="禁用">
                  <DatePicker
                    defaultValue={moment('2015-06-06', dateFormat)}
                    disabled
                  />
                  <br />
                  <MonthPicker
                    defaultValue={moment('2015-06', 'YYYY-MM')}
                    disabled
                  />
                  <br />
                  <RangePicker
                    defaultValue={[
                      moment('2015-06-06', dateFormat),
                      moment('2015-06-06', dateFormat),
                    ]}
                    disabled
                  />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="自定义日期范围选择">
                  <Custom />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="额外的页脚">
                  <DatePicker renderExtraFooter={() => 'extra footer'} />
                  <DatePicker
                    renderExtraFooter={() => 'extra footer'}
                    showTime
                  />
                  <RangePicker renderExtraFooter={() => 'extra footer'} />
                  <RangePicker
                    renderExtraFooter={() => 'extra footer'}
                    showTime
                  />
                  <MonthPicker
                    renderExtraFooter={() => 'extra footer'}
                    placeholder="Select month"
                  />
                </Section>
              </Col>

              <Col span={24}>
                <Section title="定制日期单元格">
                  <DatePicker
                    dateRender={(current) => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                      }
                      return (
                        <div className="ant-calendar-date" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                  />
                  <RangePicker
                    dateRender={(current) => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                      }
                      return (
                        <div className="ant-calendar-date" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                  />
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="日期格式">
                  <DatePicker
                    defaultValue={moment('2015/01/01', dateFormat2)}
                    format={dateFormat2}
                  />
                  <br />
                  <MonthPicker
                    defaultValue={moment('2015/01', monthFormat)}
                    format={monthFormat}
                  />
                  <br />
                  <RangePicker
                    defaultValue={[
                      moment('2015/01/01', dateFormat2),
                      moment('2015/01/01', dateFormat2),
                    ]}
                    format={dateFormat2}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="日期时间选择">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Time"
                    onChange={onChange}
                    onOk={onOk}
                  />
                  <br />
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['Start Time', 'End Time']}
                    onChange={onChange}
                    onOk={onOk}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="不可选择日期和时间">
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                  <br />
                  <MonthPicker
                    disabledDate={disabledDate}
                    placeholder="Select month"
                  />
                  <br />
                  <RangePicker
                    disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [
                        moment('00:00:00', 'HH:mm:ss'),
                        moment('11:59:59', 'HH:mm:ss'),
                      ],
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="预设范围">
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      'This Month': [moment(), moment().endOf('month')],
                    }}
                    onChange={onChange}
                  />
                  <br />
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      'This Month': [moment(), moment().endOf('month')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={onChange}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="受控面板">
                  <DatePicker
                    mode={this.state.mode}
                    showTime
                    onOpenChange={this.handleOpenChange}
                    onPanelChange={this.handlePanelChange}
                  />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
