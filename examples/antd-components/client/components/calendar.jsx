'use strict';

import React, { Component } from 'react';
import { Row, Col, Calendar, Badge, Alert } from 'antd';
import moment from 'moment';
import { Section } from '../layout';
import './calendar.less';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

export default class Demo extends Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  };

  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div id="components-calendar-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本">
              <Calendar
                onPanelChange={(value, mode) => {
                  console.log(value, mode);
                }}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="通知事项日历">
              <Calendar
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="卡片模式">
              <div
                style={{
                  width: 300,
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                }}
              >
                <Calendar
                  fullscreen={false}
                  onPanelChange={(value, mode) => {
                    console.log(value, mode);
                  }}
                />
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="选择功能">
              <Alert
                message={`You selected date: ${this.state.selectedValue &&
                  this.state.selectedValue.format('YYYY-MM-DD')}`}
              />
              <Calendar
                value={this.state.value}
                onSelect={this.onSelect}
                onPanelChange={this.onPanelChange}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="基本">
              <Calendar
                onPanelChange={(value, mode) => {
                  console.log(value, mode);
                }}
              />
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
