module.exports = (app) => {
  class DashboardController extends app.Controller {
    async index() {
      const { ctx } = this;
      ctx.body = await this.service.dashboard.find();
      ctx.status = 200;
    }
  }

  return DashboardController;
};
