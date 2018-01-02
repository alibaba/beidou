
const createRule = {
  name: 'string',
  nickName: 'string',
  isMale: 'boolean',
  age: 'number',
  phone: 'string',
  email: 'email',
  address: 'string',
};

module.exports = (app) => {
  class DashboardController extends app.Controller {
    * index() {
      const ctx = this.ctx;
      ctx.body = yield this.service.user.findAll();
      ctx.status = 200;
    }

    * create() {
      const ctx = this.ctx;
      ctx.validate(createRule);
      const { name, nickName, isMale, age, phone, email, address } = ctx.request.body;
      const user = yield this.service.user.create(name, nickName, isMale, age, phone, email, address);
      ctx.body = user;
      ctx.status = 201;
    }

    * destroy() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      yield this.service.user.delete(id);
      ctx.status = 204;
    }
  }

  return DashboardController;
};
