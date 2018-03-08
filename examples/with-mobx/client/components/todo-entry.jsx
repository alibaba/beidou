import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

@observer
export default class TodoEntry extends React.Component {
  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.newField.value.trim();

    if (val) {
      this.props.todoStore.addTodo(val);
      this.newField.value = '';
    }
  };

  render() {
    return (
      <input
        ref={(r) => {
          this.newField = r;
        }}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={this.handleNewTodoKeyDown}
        autoFocus
      />
    );
  }
}

TodoEntry.propTypes = {
  todoStore: PropTypes.object.isRequired,
};
