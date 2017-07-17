var React = require('react');
var ReactRedux = require('react-redux');
var News = require('../components/news');


var App = React.createClass({

	render() {
		return (
			<div>
				<News data={this.props.data}/>
			</div>
		);
	}
}) 

function mapStateToProps(state) {
  return {
    data: state
  }
}

module.exports = ReactRedux.connect(
  mapStateToProps
)(App);
