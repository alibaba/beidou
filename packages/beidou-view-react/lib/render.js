/**
 * Stateless Component for Render
 */
const React = require('react');

module.exports = (components, placeHolder) => (props) => {
  const {
    element = 'div',
    enable = true,
    stream = false,
    children,
    app,
  } = props;
  const Parent = element;
  const target = React.Children.only(children || app);
  if (!enable) {
    return null;
  }

  components.push({
    stream,
    component: target,
  });

  const others = objectWithoutProperties(props, [
    'element',
    'enable',
    'stream',
    'children',
    'app',
  ]);

  return React.createElement(
    Parent,
    Object.assign(others, {
      dangerouslySetInnerHTML: {
        __html: placeHolder,
      },
    }),
  );
};

function objectWithoutProperties(obj, keys) {
  const target = {};
  for (const i in obj) {
    if (keys.indexOf(i) === -1
      && Object.prototype.hasOwnProperty.call(obj, i)) {
      target[i] = obj[i];
    }
  }
  return target;
}
