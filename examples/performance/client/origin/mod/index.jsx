

import React from 'react';
import RecursiveDivs from './RecursiveDivs';

const Index = React.createClass({
  componentDidMount() {
    this.setState({
      demoModule: <RecursiveDivs depth={4} breadth={6} />
    });
  },

  getInitState() {
    return {
      demoModule: 'demo module'
    };
  },

  render() {
    // const { demoModule } = this.state;
    return (
      <div>
        <RecursiveDivs depth={4} breadth={6} />
        <RecursiveDivs depth={4} breadth={6} />
      </div>
    );
  }
});

export default Index;
