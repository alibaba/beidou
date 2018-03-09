'use strict';

import React, { Component } from 'react';
import { Row, Col, Tag } from 'antd';
import { Section } from '../../layout';
import Edit from './editable';

const { CheckableTag } = Tag;
const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

function log(e) {
  console.log(e);
}

function preventDefault(e) {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
}

class MyTag extends React.Component {
  state = { checked: true };

  handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag
        {...this.props}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    );
  }
}

export default class Demo extends Component {
  // eslint-disable-line
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div id="components--demo">
        <Row gutter={16}>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="基本">
                  <Tag>Tag 1</Tag>
                  <Tag>
                    <a href="https://github.com/ant-design/ant-design/issues/1862">
                      Link
                    </a>
                  </Tag>
                  <Tag closable onClose={log}>
                    Tag 2
                  </Tag>
                  <Tag closable onClose={preventDefault}>
                    Prevent Default
                  </Tag>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="动态添加和删除">
                  <Edit />
                </Section>
              </Col>
              <Col span={24}>
                <Section title="热门标签">
                  <h6 style={{ marginRight: 8, display: 'inline' }}>
                    Categories:
                  </h6>
                  {tagsFromServer.map(tag => (
                    <CheckableTag
                      key={tag}
                      checked={selectedTags.indexOf(tag) > -1}
                      onChange={checked => this.handleChange(tag, checked)}
                    >
                      {tag}
                    </CheckableTag>
                  ))}
                </Section>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <Section title="多彩标签">
                  <h4 style={{ marginBottom: 16 }}>Presets:</h4>
                  <div>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                  </div>
                  <h4 style={{ margin: '16px 0' }}>Custom:</h4>
                  <div>
                    <Tag color="#f50">#f50</Tag>
                    <Tag color="#2db7f5">#2db7f5</Tag>
                    <Tag color="#87d068">#87d068</Tag>
                    <Tag color="#108ee9">#108ee9</Tag>
                  </div>
                </Section>
              </Col>
              <Col span={24}>
                <Section title="可选择">
                  <MyTag>Tag1</MyTag>
                  <MyTag>Tag2</MyTag>
                  <MyTag>Tag3</MyTag>
                </Section>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
