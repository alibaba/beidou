/**
 * Stateless Component for Render
 */
const React = require('react');

module.exports = (components, placeHolder) => (props) => {
  const {
    element = 'div',
    disable = false,
    stream = false,
    children,
    app,
  } = props;
  const Wrapper = element;
  const target = React.Children.only(children || app);

  const others = objectWithoutProperties(props, [
    'element',
    'enable',
    'stream',
    'children',
    'app',
  ]);

  if (disable) {
    return React.createElement(Wrapper, others);
  }

  components.push({
    stream,
    component: target,
  });

  return React.createElement(
    Wrapper,
    Object.assign(others, {
      dangerouslySetInnerHTML: {
        __html: placeHolder,
      },
    })
  );
};

function objectWithoutProperties(obj, keys) {
  const target = {};
  for (const i in obj) {
    if (
      keys.indexOf(i) === -1 &&
      Object.prototype.hasOwnProperty.call(obj, i)
    ) {
      target[i] = obj[i];
    }
  }
  return target;
}
