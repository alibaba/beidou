'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const Container = require('../../../client/container');
const Layout = require('../layout');

module.exports = React.createClass({
  render() {
    const Provider = ReactRedux.Provider;
    return (
      <Layout {...this.props}>
        <Provider store={this.props.store}>
          <Container />
        </Provider>
      </Layout>
    );
  }
});
