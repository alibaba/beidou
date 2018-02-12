import { observable, computed, reaction } from 'mobx';
import cookie from 'js-cookie';
import TodoModel from '../models/todo-model';
import * as Utils from '../utils';

export default class TodoStore {
  @observable todos = [];

  @computed
  get activeTodoCount() {
    return this.todos.reduce((sum, todo) => sum + (todo.completed ? 0 : 1), 0);
  }

  @computed
  get completedCount() {
    return this.todos.length - this.activeTodoCount;
  }

  subscribeServerToStore() {
    reaction(
      () => this.toJS(),
      todos =>
        window.fetch &&
        fetch('/api/todos', {
          method: 'post',
          body: JSON.stringify({ todos }),
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json',
            'x-csrf-token': cookie.get('csrfToken'),
          }),
        })
    );
  }

  subscribeLocalstorageToStore() {
    reaction(
      () => this.toJS(),
      todos =>
        localStorage.setItem(
          'mobx-react-todomvc-todos',
          JSON.stringify({ todos })
        )
    );
  }

  addTodo(title) {
    this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
  }

  toggleAll(checked) {
    this.todos.forEach(todo => (todo.completed = checked));
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  toJS() {
    return this.todos.map(todo => todo.toJS());
  }

  static fromJS(array) {
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
    return todoStore;
  }
}
