'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const Container = require('./container');
const Layout = require('./layout');

module.exports = React.createClass({
  render() {
    const Provider = ReactRedux.Provider;
    return (
      <Layout data={this.props}>
        <Provider store={this.props.store}>
          <Container />
        </Provider>
      </Layout>
    );
  },
});
