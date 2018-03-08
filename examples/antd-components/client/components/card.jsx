'use strict';

import React, { Component } from 'react';
import { Row, Col, Card, Icon, Avatar } from 'antd';
import { Section } from '../layout';
import './card.less';

const { Meta } = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

export default class Demo extends Component {
  state = {
    key: 'tab1',
    noTitleKey: 'article',
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }
  render() {
    return (
      <div id="components-card-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="典型卡片">
              <Card
                title="Card title"
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="无边框">
              <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card
                  title="Card title"
                  bordered={false}
                  style={{ width: 300 }}
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="简洁卡片">
              <Card style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="更灵活的内容展示">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="栅格卡片">
              <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      Card content
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      Card content
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Card title" bordered={false}>
                      Card content
                    </Card>
                  </Col>
                </Row>
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="预加载的卡片">
              <Card loading title="Card title" style={{ width: '34%' }}>
                Whatever content
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="网格型内嵌卡片">
              <Card title="Card Title">
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="内部卡片">
              <Card title="Card title">
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(0, 0, 0, 0.85)',
                    marginBottom: 16,
                    fontWeight: 500,
                  }}
                >
                  Group title
                </p>
                <Card
                  type="inner"
                  title="Inner Card title"
                  extra={<a href="#">More</a>}
                >
                  Inner Card content
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="Inner Card title"
                  extra={<a href="#">More</a>}
                >
                  Inner Card content
                </Card>
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="带页签的卡片">
              <Card
                style={{ width: '100%' }}
                title="Card title"
                extra={<a href="#">More</a>}
                tabList={tabList}
                onTabChange={(key) => {
                  this.onTabChange(key, 'key');
                }}
              >
                {contentList[this.state.key]}
              </Card>
              <br />
              <br />
              <Card
                style={{ width: '100%' }}
                tabList={tabListNoTitle}
                onTabChange={(key) => {
                  this.onTabChange(key, 'noTitleKey');
                }}
              >
                {contentListNoTitle[this.state.noTitleKey]}
              </Card>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="支持更多内容配置">
              <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <Icon type="setting" />,
                  <Icon type="edit" />,
                  <Icon type="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
