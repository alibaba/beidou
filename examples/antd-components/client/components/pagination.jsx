'use strict';

import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import { Section } from '../layout';

export default class Demo extends Component {
  state = {
    current: 3,
  };
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
    });
  };
  render() {
    return (
      <div id="components-pagination-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本">
              <Pagination defaultCurrent={1} total={50} />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="更多">
              <Pagination defaultCurrent={6} total={500} />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="改变">
              <Pagination
                showSizeChanger
                onShowSizeChange={(current, pageSize) => {
                  console.log(current, pageSize);
                }}
                defaultCurrent={3}
                total={500}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="跳转">
              <Pagination
                showQuickJumper
                defaultCurrent={2}
                total={500}
                onChange={(pageNumber) => {
                  console.log('Page: ', pageNumber);
                }}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="迷你">
              <Pagination size="small" total={50} />
              <Pagination
                size="small"
                total={50}
                showSizeChanger
                showQuickJumper
              />
              <Pagination
                size="small"
                total={50}
                showTotal={total => `Total ${total} items`}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="简洁">
              <Pagination simple defaultCurrent={2} total={50} />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="受控">
              <Pagination
                current={this.state.current}
                onChange={this.onChange}
                total={50}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="总数">
              <Pagination
                total={85}
                showTotal={total => `Total ${total} items`}
                pageSize={20}
                defaultCurrent={1}
              />
              <br />
              <Pagination
                total={85}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                pageSize={20}
                defaultCurrent={1}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="上一步和下一步">
              <Pagination
                total={500}
                itemRender={(current, type, originalElement) => {
                  if (type === 'prev') {
                    return <a>Previous</a>;
                  } else if (type === 'next') {
                    return <a>Next</a>;
                  }
                  return originalElement;
                }}
              />
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
