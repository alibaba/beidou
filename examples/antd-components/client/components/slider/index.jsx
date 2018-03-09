'use strict';

import React, { Component } from 'react';
import { Row, Col, Slider } from 'antd';
import { Section } from '../../layout';
import Basic from './basic';
import Input from './input';
import WithIcon from './icon';

const style = {
  float: 'left',
  height: 300,
  marginLeft: 70,
};

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

const marks2 = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

function onChange(value) {
  console.log('onChange: ', value);
}

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
}

function formatter(value) {
  return `${value}%`;
}

export default class Demo extends Component {
  render() {
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Basic />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="带 icon 的滑块">
                  <WithIcon />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="事件">
                  <Slider
                    defaultValue={30}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                  />
                  <Slider
                    range
                    step={10}
                    defaultValue={[20, 50]}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                  />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="垂直">
                  <div style={{ height: 300 }}>
                    <div style={style}>
                      <Slider vertical defaultValue={30} />
                    </div>
                    <div style={style}>
                      <Slider
                        vertical
                        range
                        step={10}
                        defaultValue={[20, 50]}
                      />
                    </div>
                    <div style={style}>
                      <Slider
                        vertical
                        range
                        marks={marks}
                        defaultValue={[26, 37]}
                      />
                    </div>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="带输入框的滑块">
                  <Input />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自定义提示">
                  <Slider tipFormatter={formatter} />
                  <Slider tipFormatter={null} />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="带标签的滑块">
                  <h4>included=true</h4>
                  <Slider marks={marks2} defaultValue={37} />
                  <Slider range marks={marks2} defaultValue={[26, 37]} />

                  <h4>included=false</h4>
                  <Slider marks={marks2} included={false} defaultValue={37} />

                  <h4>marks & step</h4>
                  <Slider marks={marks2} step={10} defaultValue={37} />

                  <h4>step=null</h4>
                  <Slider marks={marks2} step={null} defaultValue={37} />
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
