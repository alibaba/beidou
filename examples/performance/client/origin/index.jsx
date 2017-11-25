

import React from 'react';
import { render } from 'beidou-plugin-react';
import Mods from './mod/index';

class Home extends React.Component {
  render() {
    return (
      <Mods />
    );
  }
}

render({
  element: <Mods />,
  containerId: 'container',
  view: Home,
});


export default Home;
