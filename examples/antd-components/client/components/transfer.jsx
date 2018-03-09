import React, { Component } from 'react';
import { Transfer, Row, Col, Button } from 'antd';
import { Section } from '../layout';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const targetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

class TransferWithSearchBoxDemo extends Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    /* eslint-disable no-shadow */
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };

  renderFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={this.getMock}
    >
      reload
    </Button>
  );

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        operations={['to right', 'to left']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => `${item.title}-${item.description}`}
        footer={this.renderFooter}
      />
    );
  }
}

class TransferComplexDemo extends Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };

  renderFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={this.getMock}
    >
      reload
    </Button>
  );

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        operations={['to right', 'to left']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => `${item.title}-${item.description}`}
        footer={this.renderFooter}
      />
    );
  }
}

class TransferWithCustomLine extends Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  };

  renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        listStyle={{
          width: 300,
          height: 300,
        }}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    );
  }
}

export default class TransferDemo extends Component {
  state = {
    targetKeys,
    selectedKeys: [],
  };

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', targetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  render() {
    const { state } = this;
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Transfer
                  dataSource={mockData}
                  titles={['Source', 'Target']}
                  targetKeys={state.targetKeys}
                  selectedKeys={state.selectedKeys}
                  onChange={this.handleChange}
                  onSelectChange={this.handleSelectChange}
                  onScroll={this.handleScroll}
                  render={item => item.title}
                />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="高级用法">
                <TransferComplexDemo />
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="带搜索框">
                <TransferWithSearchBoxDemo />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义渲染行数据">
                <TransferWithCustomLine />
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
