
module.exports = (app) => {
  // restful api
  const restfull = app.controller.restfull;
  app.router.resources('dashboard', '/api/dashboard', restfull.dashboard);

  // pages
  app.router.get('/', '/', app.controller.routes.home);
  app.router.post('login', '/api/login', app.controller.login.doLogin);
  app.router.get('login', '/login', app.controller.login.login);
  app.router.get('logout', '/logout', app.controller.login.logout);
  app.router.get('routes', '/*', app.role.can('user'), app.controller.routes.show);
};
