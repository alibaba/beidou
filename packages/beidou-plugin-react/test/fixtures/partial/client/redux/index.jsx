import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './app';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
    static getStore = function* () {
      function counter(state = 0, action) {
        switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
        }
      }

      // Create a Redux store holding the state of your app.
      // Its API is { subscribe, dispatch, getState }.
      const store = createStore(counter)
      
      return [store];
  }

  render() {
    const { state } = this.props;
    return (
      <html>
        <head>
          <title>Unittest</title>
        </head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: state }} />
        </body>
      </html>
    );
  }
}
