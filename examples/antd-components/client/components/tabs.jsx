'use strict';

import React, { Component } from 'react';
import { Row, Col, Tabs, Icon, Radio, Button, Select } from 'antd';
import { Section } from '../layout';

const { TabPane } = Tabs;
const { Option } = Select;
function callback(key) {
  console.log(key);
}

const operations = <Button>Extra Action</Button>;

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3',
        closable: false,
      },
    ];

    this.state = {
      mode: 'top',
      size: 'small',
      tabPosition: 'top',
      activeKey: panes[0].key,
      panes,
    };
  }

  onChange = (e) => {
    this.setState({ size: e.target.value });
  };

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition });
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`; // eslint-disable-line
    panes.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  };

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  };

  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  render() {
    const { mode } = this.state;
    return (
      <div id="components-tabs-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="禁用">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                  Tab 1
                </TabPane>
                <TabPane tab="Tab 2" disabled key="2">
                  Tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Tab 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="图标">
              <Tabs defaultActiveKey="2">
                <TabPane
                  tab={
                    <span>
                      <Icon type="apple" />Tab 1
                    </span>
                  }
                  key="1"
                >
                  Tab 1
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="android" />Tab 2
                    </span>
                  }
                  key="2"
                >
                  Tab 2
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="滑动">
              <Radio.Group
                onChange={this.handleModeChange}
                value={mode}
                style={{ marginBottom: 8 }}
              >
                <Radio.Button value="top">Horizontal</Radio.Button>
                <Radio.Button value="left">Vertical</Radio.Button>
              </Radio.Group>
              <Tabs
                defaultActiveKey="1"
                tabPosition={mode}
                style={{ height: 220 }}
              >
                <TabPane tab="Tab 1" key="1">
                  Content of tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of tab 3
                </TabPane>
                <TabPane tab="Tab 4" key="4">
                  Content of tab 4
                </TabPane>
                <TabPane tab="Tab 5" key="5">
                  Content of tab 5
                </TabPane>
                <TabPane tab="Tab 6" key="6">
                  Content of tab 6
                </TabPane>
                <TabPane tab="Tab 7" key="7">
                  Content of tab 7
                </TabPane>
                <TabPane tab="Tab 8" key="8">
                  Content of tab 8
                </TabPane>
                <TabPane tab="Tab 9" key="9">
                  Content of tab 9
                </TabPane>
                <TabPane tab="Tab 10" key="10">
                  Content of tab 10
                </TabPane>
                <TabPane tab="Tab 11" key="11">
                  Content of tab 11
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="附加内容">
              <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Tab 1" key="1">
                  Content of tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of tab 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="大小">
              <Radio.Group
                value={this.state.size}
                onChange={this.onChange}
                style={{ marginBottom: 16 }}
              >
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
              <Tabs defaultActiveKey="1" size={this.state.size}>
                <TabPane tab="Tab 1" key="1">
                  Content of tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of tab 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="位置">
              <div style={{ marginBottom: 16 }}>
                Tab position：
                <Select
                  value={this.state.tabPosition}
                  onChange={this.changeTabPosition}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value="top">top</Option>
                  <Option value="bottom">bottom</Option>
                  <Option value="left">left</Option>
                  <Option value="right">right</Option>
                </Select>
              </div>
              <Tabs tabPosition={this.state.tabPosition}>
                <TabPane tab="Tab 1" key="1">
                  Content of Tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="卡片式页签">
              <Tabs onChange={callback} type="card">
                <TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="新增和关闭页签">
              <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.panes.map(pane => (
                  <TabPane
                    tab={pane.title}
                    key={pane.key}
                    closable={pane.closable}
                  >
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="卡片式页签容器">
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="Tab Title 1" key="1">
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                  </TabPane>
                  <TabPane tab="Tab Title 2" key="2">
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="3">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                  </TabPane>
                </Tabs>
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="自定义新增页签触发器">
              <div style={{ marginBottom: 16 }}>
                <Button onClick={this.add}>ADD</Button>
              </div>
              <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.panes.map(pane => (
                  <TabPane tab={pane.title} key={pane.key}>
                    {pane.content}
                  </TabPane>
                ))}
              </Tabs>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
