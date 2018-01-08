'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const Container = require('../../../client/container');
const Layout = require('../layout');

module.exports = (props) => {
  const Provider = ReactRedux.Provider;
  return (
    <Layout data={props}>
      <Provider store={ props.store }>
        <Container />
      </Provider>
    </Layout>
  );
}