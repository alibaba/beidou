import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-common';
import TodoStore from './stores/todo-store';
import ViewStore from './stores/view-store';
import TodoApp from './components/todo-app';
import './view.css';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  /**
   * construct store for server side
   */
  static getStore(props) {
    const ctx = props.ctx;
    const store = {
      todos: ctx.session.todos || [],
    };

    return store;
  }
  /**
   *
   * @param {Object} locals server context variables
   * ```
   * {
   *    ctx: egg/koa context
   *    helper: view helper
   *    render: server side renderToString of react or renderToStaticMarkup if `config.react.static = true`
   *    renderToString
   *    renderToStaticMarkup
   *    request: http request object
   *    {
   *      ...
   *      req,
   *      res,
   *      ...
   *    }
   * }
   * ```
   *
   * @returns {ReactInstance|Array<ReactInstance>}
   */
  static getPartial({ store }) {
    const viewStore = new ViewStore();
    const html = <TodoApp todoStore={store} viewStore={viewStore} />;
    return { html };
  }

  render() {
    const { html, state, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example with mobx</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.initialState = ${state}`,
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */

if (__CLIENT__) {
  const initialState = window.initialState || {};

  const todoStore = TodoStore.fromJS(initialState.todos || []);
  const viewStore = new ViewStore();

  todoStore.subscribeServerToStore();

  ReactDOM.render(
    <TodoApp todoStore={todoStore} viewStore={viewStore} />,
    document.getElementById('container')
  );

  if (module.hot) {
    module.hot.accept('./components/todo-app', () => {
      const NewTodoApp = require('./components/todo-app').default;
      ReactDOM.render(
        <NewTodoApp todoStore={todoStore} viewStore={viewStore} />,
        document.getElementById('container')
      );
    });
  }
}
