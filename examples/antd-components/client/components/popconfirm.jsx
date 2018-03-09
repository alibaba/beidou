import React, { Component } from 'react';
import { message, Button, Row, Col, Popconfirm, Switch } from 'antd';
import { Section } from '../layout';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

const text = 'Are you sure delete this task?';

function confirm2() {
  message.info('Click on Yes.');
}

export default class PopconfirmDemo extends Component {
  state = {};

  state = {
    visible: false,
    // Whether meet the condition, if not show popconfirm.
    condition: true,
  };

  changeCondition = (value) => {
    this.setState({ condition: value });
  };

  confirm = () => {
    this.setState({ visible: false });
    message.success('Next step.');
  };

  cancel = () => {
    this.setState({ visible: false });
    message.error('Click on cancel.');
  };

  handleVisibleChange = (visible) => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(this.state.condition);
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Popconfirm
                  title="Are you sure delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#">Delete</a>
                </Popconfirm>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="条件触发">
                <div>
                  <Popconfirm
                    title="Are you sure delete this task?"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">Delete a task</a>
                  </Popconfirm>
                  <br />
                  <br />
                  Whether directly execute：<Switch
                    defaultChecked
                    onChange={this.changeCondition}
                  />
                </div>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="位置">
                <div className="demo">
                  <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
                    <Popconfirm
                      placement="topLeft"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>TL</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="top"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Top</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>TR</Button>
                    </Popconfirm>
                  </div>
                  <div style={{ width: 70, float: 'left' }}>
                    <Popconfirm
                      placement="leftTop"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>LT</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="left"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Left</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="leftBottom"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>LB</Button>
                    </Popconfirm>
                  </div>
                  <div style={{ width: 70, marginLeft: 304 }}>
                    <Popconfirm
                      placement="rightTop"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>RT</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="right"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Right</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="rightBottom"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>RB</Button>
                    </Popconfirm>
                  </div>
                  <div
                    style={{
                      marginLeft: 70,
                      clear: 'both',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Popconfirm
                      placement="bottomLeft"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>BL</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="bottom"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>Bottom</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="bottomRight"
                      title={text}
                      onConfirm={confirm2}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button>BR</Button>
                    </Popconfirm>
                  </div>
                </div>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="国际化">
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes, please"
                  cancelText="No, thanks"
                >
                  <a href="#">Delete</a>
                </Popconfirm>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
