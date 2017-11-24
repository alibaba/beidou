

import React from 'react';
import RecursiveDivs from './RecursiveDivs';
import CachebleDivs from './CachebleDivs';

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      demoModule: 'demo module'
    };
  }

  componentDidMount() {
    this.setState({
      demoModule: <RecursiveDivs depth={3} breadth={10} />
    });
  }

  render() {
    const { demoModule } = this.state;
    return (
      <div>
        { demoModule }
        <RecursiveDivs depth={3} breadth={10} />
        <CachebleDivs depth={3} breadth={10} />
      </div>
    );
  }
}
export default Index;
