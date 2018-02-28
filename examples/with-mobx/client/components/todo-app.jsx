import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import TodoEntry from './todo-entry';
import TodoOverview from './todo-overview';
import TodoFooter from './todo-footer';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../utils/constants';

@observer
export default class TodoApp extends React.Component {
  componentDidMount() {
    if (__CLIENT__) {
      const { Router } = require('director/build/director');
      const viewStore = this.props.viewStore;
      const router = Router({
        '/': function() {
          viewStore.todoFilter = ALL_TODOS;
        },
        '/active': function() {
          viewStore.todoFilter = ACTIVE_TODOS;
        },
        '/completed': function() {
          viewStore.todoFilter = COMPLETED_TODOS;
        },
      });
      router.init('/');
    }
  }
  render() {
    const { todoStore, viewStore } = this.props;
    return (
      <div>
        <DevTool />
        <header className="header">
          <h1>todos</h1>
          <TodoEntry todoStore={todoStore} />
        </header>
        <TodoOverview todoStore={todoStore} viewStore={viewStore} />
        <TodoFooter todoStore={todoStore} viewStore={viewStore} />
      </div>
    );
  }
}

TodoApp.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired,
};
