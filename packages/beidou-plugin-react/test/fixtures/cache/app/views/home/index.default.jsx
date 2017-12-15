'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
var Container = require('../../../client/container');
var Layout = require('../layout');

module.exports = React.createClass({
	render() {
		var Provider = ReactRedux.Provider;
		return (
			<Layout state={this.props.state} title={this.props.title}>
				<Provider store={ this.props.store }>
				  <Container />
				</Provider>
			</Layout>
		);
	}
});