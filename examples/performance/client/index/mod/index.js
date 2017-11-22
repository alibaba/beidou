

import React from 'react';
import RecursiveDivs from './RecursiveDivs';

class Index extends React.Component {
  componentCacheKey() {
    return this.props.cache;
  }

  render() {
    return (
      <RecursiveDivs depth={5} breadth={5} />
    );
  }
}
export default Index;
