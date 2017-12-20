module.exports = (app) => {
  // validate rules
  const loginRule = {
    username: 'string',
    password: 'string',
  };

  class LoginController extends app.Controller {
    * doLogin() { // eslint-disable-line
      const ctx = this.ctx;
      ctx.validate(loginRule);

      const data = ctx.request.body;
      debugger; // eslint-disable-line
      if (data.username === 'beidou' && data.password === 'admin') {
        ctx.session.user = {
          username: 'guest',
          loginAt: Date.now(),
        };

        ctx.body = {
          success: true,
        };
      } else {
        ctx.body = {
          success: false,
        };
      }

      ctx.status = 200;
    }

    * login() {
      yield this.ctx.render('pages/login');
    }

    * logout() { // eslint-disable-line
      const ctx = this.ctx;
      ctx.session.user = null;

      ctx.redirect(`/login${ctx.request.search}`);
    }
  }
  return LoginController;
};
