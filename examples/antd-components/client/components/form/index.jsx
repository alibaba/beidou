'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';
import LoginInline from './login-inline';
import Login from './login';
import Register from './register';
import Search from './search';
import Popover from './popover';
import Dynamic from './dynamic';
import Timer from './timer';
import Custom from './custom';
import StoreInParent from './store-in-parent';
import RawForm from './raw';
import Validate from './validate';
import Cascade from './cascade';
import Layout from './layout';
import DynamicRule from './dynamic-rule';
import Other from './other';

import './index.less';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-form-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="水平登录栏">
              <LoginInline />
            </Section>
          </Col>
          <Col span={24}>
            <Section
              title="登录框"
              className="components-form-demo-normal-login"
            >
              <Login />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="注册新用户">
              <Register />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="高级搜索">
              <Search />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="弹出层中的新建表单">
              <Popover />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="动态增减表单项">
              <Dynamic />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="时间类控件">
              <Timer />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="自定义表单控件">
              <Custom />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="表单数据存储于上层组件">
              <StoreInParent />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="自行处理表单数据">
              <RawForm />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="自定义校验">
              <Validate />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="表单联动">
              <Cascade />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="表单布局">
              <Layout />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="动态校验规则">
              <DynamicRule />
            </Section>
          </Col>
          <Col span={24}>
            <Section title="校验其他组件">
              <Other />
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
