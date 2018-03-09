import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Sider from './sider';
import Nav from './nav';
import Bread from './bread';
import style from './index.module.less';
import { config } from './menu';

const cx = classNames.bind(style);

class Layout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      siderFolded: false,
    };
  }

  handleFad = () => {
    this.setState({
      siderFolded: !this.state.siderFolded,
    });
  };

  render() {
    const { children } = this.props;
    const { siderFolded } = this.state;
    const { router } = this.context;
    const { location } = router.history;

    return (
      <div className={cx('layout', { fold: siderFolded })}>
        <Sider siderFolded={siderFolded} location={location} />
        <div className={cx('main')} id="mainContainer">
          <Nav
            siderFolded={siderFolded}
            onFade={this.handleFad}
            location={location}
          />
          <Bread className={cx('bread')} menus={config} location={location} />
          <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
