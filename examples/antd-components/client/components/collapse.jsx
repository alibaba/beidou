'use strict';

import React, { Component } from 'react';
import { Row, Col, Collapse } from 'antd';
import { Section } from '../layout';

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const styledText = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class Demo extends Component {
  render() {
    return (
      <div id="components-callapse-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="折叠面板">
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="This is panel header 1" key="1">
                  <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" disabled>
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="手风琴">
              <Collapse accordion>
                <Panel header="This is panel header 1" key="1">
                  <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="面板嵌套">
              <Collapse onChange={callback}>
                <Panel header="This is panel header 1" key="1">
                  <Collapse defaultActiveKey="1">
                    <Panel header="This is panel nest panel" key="1">
                      <p>{text}</p>
                    </Panel>
                  </Collapse>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="简洁风格">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                  {styledText}
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  {styledText}
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  {styledText}
                </Panel>
              </Collapse>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="自定义面板">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel
                  header="This is panel header 1"
                  key="1"
                  style={customPanelStyle}
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="This is panel header 2"
                  key="2"
                  style={customPanelStyle}
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="This is panel header 3"
                  key="3"
                  style={customPanelStyle}
                >
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="隐藏箭头">
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="This is panel header with arrow icon" key="1">
                  <p>{text}</p>
                </Panel>
                <Panel
                  showArrow={false}
                  header="This is panel header with no arrow icon"
                  key="2"
                >
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
