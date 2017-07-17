/**
 * iosmorphic render
 *
 * in client side, run `ReactDOM.render`
 *
 * in server side, inject render info to `Componet[Symbol.for('ReactView#view')]`
 */
let render = () => {};
if (typeof __CLIENT__ !== 'undefined' && __CLIENT__ === true) {
  const _render = require('react-dom').render;
  render = ({ element, containerId, callback }) => {
    _render(element, document.getElementById(containerId), callback);
  };
} else {
  const symbol = Symbol.for('ReactView#view');
  render = ({ element, containerId, view, style }) => {
    const config = view[symbol] || {
      containerIds: [],
      elements: [],
      styles: [],
    };
    config.containerIds.push(containerId);
    config.elements.push(element);
    style && config.styles.push(style);
    view[symbol] = config;
  };
}

module.exports = render;
