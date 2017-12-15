module.exports = (app) => {
  app.get('/sass', app.controller.home.sass);
  app.get('/less', app.controller.home.less);
  app.get('/others', app.controller.home.others);
};
