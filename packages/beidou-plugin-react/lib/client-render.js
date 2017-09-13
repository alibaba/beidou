const _render = require('react-dom').render;

module.exports = function (args) {
  _render(args.element, document.getElementById(args.containerId), args.callback);
};
