
var React = require('react');

var News = React.createClass({
	propTypes: {
    name: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      name: '',
    };
  },

  render() {
		return <div>{this.props.data.name}</div>;
	}

});

module.exports = News;