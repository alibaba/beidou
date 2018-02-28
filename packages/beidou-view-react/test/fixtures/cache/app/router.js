module.exports = (app) => {
  app.get('/', app.controller.home.jsxtpl);
  app.get('/jstpl', app.controller.home.jstpl);
  app.get('/combo', app.controller.home.combo);
  app.get('/cdn-supply', app.controller.home.cdnSupply);
};
