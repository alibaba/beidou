## CSS

### CSS-in-JSX

The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property

```javascript
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

### importing CSS/less/scss

Beidou suport importing CSS/less/scss from other style sheets using the @import statement. and it will be auto combiled by webpack plugin. It shares some of the same advantages as linking a stylesheet, like browser caching and maintenance efficiency.

```javascript
import React from 'react';
import './index.scss';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <h1 className="title">Hello world, Beidou</h1>
    );
  }
}
```

### css-modules supported

[CSS Modules](https://github.com/css-modules) is a popular system for modularizing and composing CSS. It was supported in our internal versions of Beidou, and will be open-sourced ASAP.