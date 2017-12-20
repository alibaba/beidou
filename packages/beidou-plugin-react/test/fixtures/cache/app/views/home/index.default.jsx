'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
var Container = require('../../../client/container');
var Layout = require('../layout');

module.exports = props => {
	var Provider = ReactRedux.Provider;
	return (
		<Layout state={props.state} title={props.title}>
			<Provider store={ props.store }>
				<Container />
			</Provider>
		</Layout>
	);
}