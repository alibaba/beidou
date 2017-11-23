

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
      demoModule: <RecursiveDivs depth={5} breadth={5} />
    });
  },

  render() {
    // const { demoModule } = this.state;
    return (
      <div>
        <RecursiveDivs depth={5} breadth={5} />
        <RecursiveDivs depth={5} breadth={5} />
      </div>
    );
  }
});

export default Index;
