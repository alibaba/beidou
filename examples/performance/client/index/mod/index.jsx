

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
      demoModule: <RecursiveDivs depth={5} breadth={5} />
    });
  }

  render() {
    // const { demoModule } = this.state;
    return (
      <div>
        <RecursiveDivs depth={5} breadth={5} />
        <RecursiveDivs depth={5} breadth={5} />
      </div>
    );
  }
}
export default Index;
