'use strict';

import React, { Component } from 'react';
import {
  Row,
  Col,
  List,
  Spin,
  Button,
  Avatar,
  Icon,
  Card,
  message,
} from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import { WindowScroller, AutoSizer, List as VList, InfiniteLoader } from 'react-virtualized';
import { Section } from '../layout';

const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const listData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const vData = [];
for (let i = 0; i < 5; i++) {
  vData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: vData.length,
  onChange: () => {},
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class VirtualizedExample extends React.Component {
  state = {
    data: [],
    loading: false,
  }
  componentWillMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  loadedRowsMap = {}

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }
  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index]
  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.name.last}</a>}
          description={item.email}
        />
        <div>Content</div>
      </List.Item>
    );
  }
  render() {
    const { data } = this.state;
    const vlist = ({ isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={730}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
      </InfiniteLoader>
    );
    return (
      <List>
        {
          data.length > 0 && (
            <WindowScroller scrollElement={null}>
              {infiniteLoader}
            </WindowScroller>
          )
        }
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
    );
  }
}

export default class Demo extends Component { // eslint-disable-line
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    hasMore: true,
  };

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        loading: false,
        data: res.results,
      });
    });
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          loadingMore: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        }
      );
    });
  };

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  };

  loadedRowsMap = {};

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {loadingMore && <Spin />}
        {!loadingMore && (
          <Button onClick={this.onLoadMore}>loading more</Button>
        )}
      </div>
    ) : null;

    return (
      <div id="components-list-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="简单列表">
              <h3 style={{ marginBottom: 16 }}>Default Size</h3>
              <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={listData}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
              <h3 style={{ margin: '16px 0' }}>Small Size</h3>
              <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={listData}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
              <h3 style={{ margin: '16px 0' }}>Large Size</h3>
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={listData}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="基础列表">
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: 'Ant Design Title 1',
                  },
                  {
                    title: 'Ant Design Title 2',
                  },
                  {
                    title: 'Ant Design Title 3',
                  },
                  {
                    title: 'Ant Design Title 4',
                  },
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="加载更多">
              <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                  <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>content</div>
                  </List.Item>
                )}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="竖排列表样式">
              <List
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText type="star-o" text="156" />,
                      <IconText type="like-o" text="156" />,
                      <IconText type="message" text="2" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="栅格列表">
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={[
                  {
                    title: 'Title 1',
                  },
                  {
                    title: 'Title 2',
                  },
                  {
                    title: 'Title 3',
                  },
                  {
                    title: 'Title 4',
                  },
                ]}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>Card content</Card>
                  </List.Item>
                )}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="响应式的栅格列表">
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={[
                  {
                    title: 'Title 1',
                  },
                  {
                    title: 'Title 2',
                  },
                  {
                    title: 'Title 3',
                  },
                  {
                    title: 'Title 4',
                  },
                  {
                    title: 'Title 5',
                  },
                  {
                    title: 'Title 6',
                  },
                ]}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>Card content</Card>
                  </List.Item>
                )}
              />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="滚动加载">
              <div className="demo-infinite-container">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={this.state.data}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={
                            <a href="https://ant.design">{item.name.last}</a>
                          }
                          description={item.email}
                        />
                        <div>Content</div>
                      </List.Item>
                    )}
                  >
                    {this.state.loading &&
                      this.state.hasMore && <Spin className="demo-loading" />}
                  </List>
                </InfiniteScroll>
              </div>
            </Section>
          </Col>

          <Col span={24}>
            <Section title="滚动加载无限长列表">
              <VirtualizedExample />
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
