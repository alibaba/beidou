'use strict';

import React, { Component } from 'react';
import { Row, Col, Tooltip, Button } from 'antd';
import { Section } from '../layout';
import './tooltip.less';

const text = <span>prompt text</span>;

const buttonWidth = 70;

export default class Demo extends Component {
  render() {
    return (
      <div id="components-tooltip-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Tooltip title="prompt text">
                    <span>Tooltip will show when mouse enter.</span>
                  </Tooltip>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="">
                  <Tooltip placement="topLeft" title="Prompt Text">
                    <Button>Align edge / 边缘对齐</Button>
                  </Tooltip>
                  <Tooltip
                    placement="topLeft"
                    title="Prompt Text"
                    arrowPointAtCenter
                  >
                    <Button>Arrow points to center / 箭头指向中心</Button>
                  </Tooltip>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="位置">
                  <div
                    style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}
                  >
                    <Tooltip placement="topLeft" title={text}>
                      <Button>TL</Button>
                    </Tooltip>
                    <Tooltip placement="top" title={text}>
                      <Button>Top</Button>
                    </Tooltip>
                    <Tooltip placement="topRight" title={text}>
                      <Button>TR</Button>
                    </Tooltip>
                  </div>
                  <div style={{ width: buttonWidth, float: 'left' }}>
                    <Tooltip placement="leftTop" title={text}>
                      <Button>LT</Button>
                    </Tooltip>
                    <Tooltip placement="left" title={text}>
                      <Button>Left</Button>
                    </Tooltip>
                    <Tooltip placement="leftBottom" title={text}>
                      <Button>LB</Button>
                    </Tooltip>
                  </div>
                  <div
                    style={{
                      width: buttonWidth,
                      marginLeft: buttonWidth * 4 + 24,
                    }}
                  >
                    <Tooltip placement="rightTop" title={text}>
                      <Button>RT</Button>
                    </Tooltip>
                    <Tooltip placement="right" title={text}>
                      <Button>Right</Button>
                    </Tooltip>
                    <Tooltip placement="rightBottom" title={text}>
                      <Button>RB</Button>
                    </Tooltip>
                  </div>
                  <div
                    style={{
                      marginLeft: buttonWidth,
                      clear: 'both',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Tooltip placement="bottomLeft" title={text}>
                      <Button>BL</Button>
                    </Tooltip>
                    <Tooltip placement="bottom" title={text}>
                      <Button>Bottom</Button>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={text}>
                      <Button>BR</Button>
                    </Tooltip>
                  </div>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
