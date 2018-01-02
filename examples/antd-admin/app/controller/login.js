module.exports = (app) => {
  // validate rules
  const loginRule = {
    username: 'string',
    password: 'string',
  };

  class LoginController extends app.Controller {
    * doLogin() {
      const ctx = this.ctx;
      ctx.validate(loginRule);

      const { username, password } = ctx.request.body;
      if (username && password) {
        const user = yield this.service.user.find(username, password);
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

    * login() {
      yield this.ctx.render('pages/login');
    }

    * logout() { // eslint-disable-line
      const ctx = this.ctx;
      ctx.session.user = undefined;

      ctx.redirect(`/login${ctx.request.search}`);
    }
  }
  return LoginController;
};
