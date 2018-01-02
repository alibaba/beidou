
module.exports = (app) => {
  class DashboardController extends app.Controller {
    * index() {
      const ctx = this.ctx;
      ctx.body = yield this.service.dashboard.find();
      ctx.status = 200;
    }
  }

  return DashboardController;
};
