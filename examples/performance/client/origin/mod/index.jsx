

import React from 'react';
import RecursiveDivs from './RecursiveDivs';
import CachebleDivs from './CachebleDivs';

const Index = React.createClass({
  render() {
    return (
      <div>
        <RecursiveDivs depth={3} breadth={10} />
        <RecursiveDivs depth={3} breadth={10} />
        <CachebleDivs depth={3} breadth={10} />
      </div>
    );
  }
});

export default Index;
