'use strict';

import React, { Component } from 'react';
import { Row, Col, Button, Avatar, Badge } from 'antd';
import { Section } from '../layout';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserList[0],
      color: colorList[0],
    };
  }
  changeUser = () => {
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
    });
  };

  render() {
    return (
      <div id="components-avatar-demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <div>
                    <Avatar size="large" icon="user" />
                    <Avatar icon="user" />
                    <Avatar size="small" icon="user" />
                  </div>
                  <div>
                    <Avatar shape="square" size="large" icon="user" />
                    <Avatar shape="square" icon="user" />
                    <Avatar shape="square" size="small" icon="user" />
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="自动调整字符大小">
                  <Avatar
                    style={{
                      backgroundColor: this.state.color,
                      verticalAlign: 'middle',
                    }}
                    size="large"
                  >
                    {this.state.user}
                  </Avatar>
                  <Button
                    size="small"
                    style={{ marginLeft: 16, verticalAlign: 'middle' }}
                    onClick={this.changeUser}
                  >
                    Change
                  </Button>
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="类型">
                  <Avatar icon="user" />
                  <Avatar>U</Avatar>
                  <Avatar>USER</Avatar>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <Avatar
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    U
                  </Avatar>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="带徽标的头像">
                  <span style={{ marginRight: 24 }}>
                    <Badge count={1}>
                      <Avatar shape="square" icon="user" />
                    </Badge>
                  </span>
                  <span>
                    <Badge dot>
                      <Avatar shape="square" icon="user" />
                    </Badge>
                  </span>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
