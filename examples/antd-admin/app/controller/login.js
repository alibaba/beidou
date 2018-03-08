module.exports = (app) => {
  // validate rules
  const loginRule = {
    username: 'string',
    password: 'string',
  };

  class LoginController extends app.Controller {
    async doLogin() {
      const { ctx } = this;
      ctx.validate(loginRule);

      const { username, password } = ctx.request.body;
      if (username && password) {
        const user = await this.service.user.find(username, password);
        if (user) {
          ctx.session.user = user;

          ctx.body = {
            success: true,
          };
        } else {
          ctx.body = {
            success: false,
          };
        }
      }
      ctx.status = 200;
    }

    async login() {
      await this.ctx.render('pages/login');
    }

    async logout() {
      const { ctx } = this;
      ctx.session.user = undefined;

      ctx.redirect(`/login${ctx.request.search}`);
    }
  }
  return LoginController;
};
