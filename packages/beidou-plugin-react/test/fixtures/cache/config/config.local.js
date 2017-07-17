var path = require('path');

module.exports = function (antx) {
	const exports = {
		react: {
		  cache: true,
    	internals: false,
    	clientPath: `${antx.baseDir}/client`,
      loadpath: `${antx.baseDir}/app/views`
		}
	};
	return exports;
}
