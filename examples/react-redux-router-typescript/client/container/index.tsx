import { hot } from 'react-hot-loader';
import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

import './index.less';

class Container extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(actions.greet());
  }

  render() {
    return (
      <div className="page">
        <h1>Redux Example</h1>
        <button onClick={() => alert('hi')}>click</button>
        <p>Hello, {this.props.greeting}</p>
      </div>
    );
  }
}

const ConnectedContainer = connect(state => state)(Container);

export default hot(module)(ConnectedContainer);
