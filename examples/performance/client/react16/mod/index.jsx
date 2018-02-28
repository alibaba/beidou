import React from 'react';
import RecursiveDivs from './RecursiveDivs';

class Index extends React.Component {
  render() {
    return (
      <div className="recursive">
        <RecursiveDivs depth={3} breadth={10} />
        <RecursiveDivs depth={3} breadth={10} />
        <RecursiveDivs depth={3} breadth={10} />
      </div>
    );
  }
}
export default Index;
