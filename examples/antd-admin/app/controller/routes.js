module.exports = (app) => {
  class RoutesController extends app.Controller {
    async home() {
      this.ctx.redirect('/dashboard');
    }

    async show() {
      await this.ctx.render('pages/dashboard');
    }
  }
  return RoutesController;
};
