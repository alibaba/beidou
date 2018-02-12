'use strict';

module.exports = (app) => {
  app.router.resources('todo', '/api/todos', app.controller.todo);
};
