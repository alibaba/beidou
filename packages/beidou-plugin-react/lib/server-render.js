const symbol = Symbol.for('ReactView#view');
module.exports = ({ element, containerId, view, style }) => {
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
