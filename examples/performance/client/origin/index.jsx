

import React from 'react';
import { render } from 'beidou-plugin-react';
import createReactClass from 'create-react-class';
import Mods from './mod/index';


const Home = createReactClass({
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
