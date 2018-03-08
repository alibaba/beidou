'use strict';

import React, { Component } from 'react';
import { Row, Col, Popover, Button } from 'antd';
import { Section } from '../layout';
import './popover.less';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

export default class Demo extends Component {
  state = {
    visible: false,
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  render() {
    return (
      <div id="components-popover-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Popover content={content} title="Title">
                    <Button type="primary">Hover me</Button>
                  </Popover>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="位置" className="placement">
                  <div
                    style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}
                  >
                    <Popover
                      placement="topLeft"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>TL</Button>
                    </Popover>
                    <Popover
                      placement="top"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>Top</Button>
                    </Popover>
                    <Popover
                      placement="topRight"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>TR</Button>
                    </Popover>
                  </div>
                  <div style={{ width: buttonWidth, float: 'left' }}>
                    <Popover
                      placement="leftTop"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>LT</Button>
                    </Popover>
                    <Popover
                      placement="left"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>Left</Button>
                    </Popover>
                    <Popover
                      placement="leftBottom"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>LB</Button>
                    </Popover>
                  </div>
                  <div
                    style={{
                      width: buttonWidth,
                      marginLeft: (buttonWidth * 4) + 24,
                    }}
                  >
                    <Popover
                      placement="rightTop"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>RT</Button>
                    </Popover>
                    <Popover
                      placement="right"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>Right</Button>
                    </Popover>
                    <Popover
                      placement="rightBottom"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>RB</Button>
                    </Popover>
                  </div>
                  <div
                    style={{
                      marginLeft: buttonWidth,
                      clear: 'both',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Popover
                      placement="bottomLeft"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>BL</Button>
                    </Popover>
                    <Popover
                      placement="bottom"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>Bottom</Button>
                    </Popover>
                    <Popover
                      placement="bottomRight"
                      title={text}
                      content={content}
                      trigger="click"
                    >
                      <Button>BR</Button>
                    </Popover>
                  </div>
                </Section>
              </Col>

              <Col span={24}>
                <Section title="箭头指向">
                  <Popover placement="topLeft" title={text} content={content}>
                    <Button>Align edge / 边缘对齐</Button>
                  </Popover>
                  <Popover
                    placement="topLeft"
                    title={text}
                    content={content}
                    arrowPointAtCenter
                  >
                    <Button>Arrow points to center / 箭头指向中心</Button>
                  </Popover>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="三种触发方式" className="placement">
                  <Popover content={content} title="Title" trigger="hover">
                    <Button>Hover me</Button>
                  </Popover>
                  <Popover content={content} title="Title" trigger="focus">
                    <Button>Focus me</Button>
                  </Popover>
                  <Popover content={content} title="Title" trigger="click">
                    <Button>Click me</Button>
                  </Popover>
                </Section>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Section title="从浮层内关闭">
                  <Popover
                    content={<a onClick={this.hide}>Close</a>}
                    title="Title"
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <Button type="primary">Click me</Button>
                  </Popover>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
