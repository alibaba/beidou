

import React from 'react';
import RecursiveDivs from './RecursiveDivs';

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      demoModule: 'demo module'
    };
  }

  componentDidMount() {
    this.setState({
      demoModule: <RecursiveDivs depth={4} breadth={6} />
    });
  }

  render() {
    // const { demoModule } = this.state;
    return (
      <div>
        <RecursiveDivs depth={4} breadth={6} />
        <RecursiveDivs depth={4} breadth={6} />
      </div>
    );
  }
}
export default Index;
