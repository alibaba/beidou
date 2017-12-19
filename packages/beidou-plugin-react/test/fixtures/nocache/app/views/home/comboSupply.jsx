'use strict';
var React = require('react');

module.exports = (props) {
	return (
		<html>
			<head>
				{ props.helper.comboCss(['a.css', 'b.css'], 'aaaa') }
			</head>
			<body>
				{ props.helper.comboScript(['a.js', 'abc/b/c/b.js'], 'aaaa') }
			</body>
		</html>
	);
}