

import React from 'react';
// import createReactClass from 'create-react-class';
import { render } from 'beidou-plugin-react';
import Mods from './mod/index';


const Home = React.createClass({
  render() {
    return (
      <Mods />
    );
  }
});

render({
  element: <Mods />,
  containerId: 'container',
  view: Home,
});


export default Home;
