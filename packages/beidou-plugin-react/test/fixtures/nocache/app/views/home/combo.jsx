'use strict';
var React = require('react');

module.exports = React.createClass({
	render() {
		return (
			<html>
			  <head>
          { this.props.helper.comboCss(['a.css', 'b.css']) }
			  </head>
			  <body>
			    { this.props.helper.comboScript(['a.js', 'abc/b/c/b.js']) }
			  </body>
			</html>
		);
	}
});