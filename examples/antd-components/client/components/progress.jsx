import React, { Component } from 'react';
import { Button, Row, Col, Progress } from 'antd';
import { Section } from '../layout';

const ButtonGroup = Button.Group;

class DynamicProgress extends Component {
  state = {
    percent: 0,
  };

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  };

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };

  render() {
    return (
      <div>
        <Progress type="circle" percent={this.state.percent} />
        <ButtonGroup>
          <Button onClick={this.decline} icon="minus" />
          <Button onClick={this.increase} icon="plus" />
        </ButtonGroup>
      </div>
    );
  }
}

export default class ProgressDemo extends Component {
  state = {
    percent: 0,
  };

  increase = () => {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  };

  decline = () => {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  };

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="进度条">
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
                <Progress percent={50} showInfo={false} />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="小型进度条">
                <div style={{ width: 170 }}>
                  <Progress percent={30} size="small" />
                  <Progress percent={50} size="small" status="active" />
                  <Progress percent={70} size="small" status="exception" />
                  <Progress percent={100} size="small" />
                </div>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="进度圈动态展示">
                <DynamicProgress />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义文字格式">
                <Progress
                  type="circle"
                  percent={75}
                  format={percent => `${percent} Days`}
                />
                <Progress type="circle" percent={100} format={() => 'Done'} />
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="进度圈">
                <Progress type="circle" percent={75} />
                <Progress type="circle" percent={70} status="exception" />
                <Progress type="circle" percent={100} />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="小型进度圈">
                <Progress type="circle" percent={30} width={80} />
                <Progress
                  type="circle"
                  percent={70}
                  width={80}
                  status="exception"
                />
                <Progress type="circle" percent={100} width={80} />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="动态展示">
                <Progress percent={this.state.percent} />
                <ButtonGroup>
                  <Button onClick={this.decline} icon="minus" />
                  <Button onClick={this.increase} icon="plus" />
                </ButtonGroup>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="仪表盘">
                <Progress type="dashboard" percent={75} />
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
