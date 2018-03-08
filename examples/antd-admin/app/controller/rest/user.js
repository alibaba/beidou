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
    async index() {
      const { ctx } = this;
      ctx.body = await this.service.user.findAll();
      ctx.status = 200;
    }

    async create() {
      const { ctx } = this;
      ctx.validate(createRule);
      const {
        name,
        nickName,
        isMale,
        age,
        phone,
        email,
        address,
      } = ctx.request.body;
      const user = await this.service.user.create(
        name,
        nickName,
        isMale,
        age,
        phone,
        email,
        address
      );
      ctx.body = user;
      ctx.status = 201;
    }

    async destroy() {
      const { ctx } = this;
      const { id } = ctx.params;
      await this.service.user.delete(id);
      ctx.status = 204;
    }
  }

  return DashboardController;
};
