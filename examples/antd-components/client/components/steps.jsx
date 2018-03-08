'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Steps, Icon, message, Popover } from 'antd';
import { Section } from '../layout';

const Step = Steps.Step;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const steps = [
      {
        title: 'First',
        content: 'First-content',
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
      {
        title: 'Last',
        content: 'Last-content',
      },
    ];

    return (
      <div id="components-steps-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本用法">
              <Steps current={1}>
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="迷你版">
              <Steps size="small" current={1}>
                <Step title="Finished" />
                <Step title="In Progress" />
                <Step title="Waiting" />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="带图标的步骤条">
              <Steps>
                <Step
                  status="finish"
                  title="Login"
                  icon={<Icon type="user" />}
                />
                <Step
                  status="finish"
                  title="Verification"
                  icon={<Icon type="solution" />}
                />
                <Step
                  status="process"
                  title="Pay"
                  icon={<Icon type="loading" />}
                />
                <Step
                  status="wait"
                  title="Done"
                  icon={<Icon type="smile-o" />}
                />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="步骤切换">
              <Steps current={this.state.current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">
                {steps[this.state.current].content}
              </div>
              <div className="steps-action">
                {this.state.current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next()}>
                    Next
                  </Button>
                )}
                {this.state.current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success('Processing complete!')}
                  >
                    Done
                  </Button>
                )}
                {this.state.current > 0 && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="竖直方向的步骤条">
              <Steps direction="vertical" current={1}>
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="竖直方向的小型步骤条">
              <Steps direction="vertical" size="small" current={1}>
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="步骤运行错误">
              <Steps current={1} status="error">
                <Step title="Finished" description="This is a description" />
                <Step title="In Process" description="This is a description" />
                <Step title="Waiting" description="This is a description" />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="点状步骤条">
              <Steps progressDot current={1}>
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="自定义点状步骤条" />
          </Col>

          <Col span={24}>
            <Section title="基本">
              <Steps
                current={1}
                progressDot={(dot, { status, index }) => (
                  <Popover
                    content={
                      <span>
                        step {index} status: {status}
                      </span>
                    }
                  >
                    {dot}
                  </Popover>
                )}
              >
                <Step
                  title="Finished"
                  description="You can hover on the dot."
                />
                <Step
                  title="In Progress"
                  description="You can hover on the dot."
                />
                <Step title="Waiting" description="You can hover on the dot." />
                <Step title="Waiting" description="You can hover on the dot." />
              </Steps>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
