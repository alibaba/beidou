import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import Page from 'client/components/page';
import color from 'client/utils/color';
import NumberCard from './components/number-card';
import Sales from './components/sales';
import Weather from './components/weather';
import Quote from './components/quote';
import RecentSales from './components/recent-sales';
import Comments from './components/comments';
import Completed from './components/completed';
import Browser from './components/browser';
import User from './components/user';
import Cpu from './components/cpu';

import actions from '../../actions';
import styles from './index.module.less';

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
};

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.dashboard.fetch());
  }

  render() {
    const {
      weather,
      sales,
      quote,
      numbers,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = this.props;
    const numberCards = numbers.map(item => (
      <Col key={item} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ));

    return (
      <Page loading={false}>
        <Row gutter={24}>
          {numberCards}
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Sales data={sales} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: color.blue,
                  }}
                >
                  <Weather {...weather} />
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: color.peach,
                  }}
                >
                  <Quote {...quote} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <RecentSales data={recentSales} />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Comments data={comments} />
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <Cpu {...cpu} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              <User {...user} />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
};

export default connect(state => state.dashboard)(Dashboard);
