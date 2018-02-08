import React, { Component } from 'react';
import Child from 'client/child';

class ClientPage extends Component {
  render() {
    return <div>
      <Child data={123} />
    </div>;
  }
}

export default ClientPage;
