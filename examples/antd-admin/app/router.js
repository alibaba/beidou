module.exports = (app) => {
  // restful api
  const { rest } = app.controller;
  app.router.resources('dashboard', '/api/dashboard', rest.dashboard);
  app.router.resources('dashboard', '/api/user', rest.user);

  // pages
  app.router.get('/', '/', app.controller.routes.home);
  app.router.post('login', '/api/login', app.controller.login.doLogin);
  app.router.get('login', '/login', app.controller.login.login);
  app.router.get('logout', '/logout', app.controller.login.logout);
  app.router.get(
    'routes',
    '/*',
    app.role.can('user'),
    app.controller.routes.show
  );
};
