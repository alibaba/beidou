

import React from 'react';
import RecursiveDivs from './RecursiveDivs';

class Index extends React.Component {
  componentCacheKey() {
    return this.props.cache;
  }

  render() {
    return (
      <div>
        <RecursiveDivs depth={5} breadth={5} />
        <RecursiveDivs depth={5} breadth={5} />
      </div>
    );
  }
}
export default Index;
