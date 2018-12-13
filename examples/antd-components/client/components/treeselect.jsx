import React, { Component } from 'react';
import { TreeSelect, Row, Col } from 'antd';
import { Section } from '../layout';

const { TreeNode } = TreeSelect;

export default class TreeSelectDemo extends Component {
  state = {
    value: undefined,
    value2: undefined,
  };

  onChange = (value) => {
    // console.log(arguments);
    this.setState({ value });
  };

  onChange2 = (value2) => {
    // console.log(arguments);
    this.setState({ value2 });
  };

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <TreeSelect
                  showSearch
                  style={{ width: 300 }}
                  value={this.state.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={this.onChange}
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random" />
                      <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode
                      value="parent 1-1"
                      title="parent 1-1"
                      key="random2"
                    >
                      <TreeNode
                        value="sss"
                        title={<b style={{ color: '#08c' }}>sss</b>}
                        key="random3"
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="多选">
                <TreeSelect
                  showSearch
                  style={{ width: 300 }}
                  value={this.state.value2}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.onChange2}
                >
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random" />
                      <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode
                      value="parent 1-1"
                      title="parent 1-1"
                      key="random2"
                    >
                      <TreeNode
                        value="sss"
                        title={<b style={{ color: '#08c' }}>sss</b>}
                        key="random3"
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
