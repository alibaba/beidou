

import React from 'react';
import createReactClass from 'create-react-class';
import RecursiveDivs from './RecursiveDivs';

const Index = createReactClass({
  getInitState() {
    return {
      demoModule: 'demo module'
    };
  },

  componentDidMount() {
    this.setState({
      demoModule: <RecursiveDivs depth={4} breadth={6} />
    });
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
