'use strict';

module.exports = (app) => {
  class TodoController extends app.Controller {
    async create() {
      const ctx = this.ctx;
      const { todos } = ctx.request.body;
      ctx.session.todos = todos;
      ctx.body = todos;
      ctx.status = 201;
    }
  }

  return TodoController;
};
