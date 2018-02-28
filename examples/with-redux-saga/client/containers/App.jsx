import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

const App = ({
  count,
  increment,
  decrement,
  incrementIfOdd,
  decrementAsync,
}) => (
  <div>
    <Counter
      value={count}
      onIncrement={increment}
      onDecrement={decrement}
      onIncrementIfOdd={incrementIfOdd}
      onIncrementAsync={decrementAsync}
    />
  </div>
);

const mapStateToProps = state => ({
  count: state,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' }),
  incrementIfOdd: () => dispatch({ type: 'INCREMENT_IF_ODD' }),
  decrementAsync: () => dispatch({ type: 'INCREMENT_ASYNC' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
