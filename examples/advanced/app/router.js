module.exports = (app) => {
  app.get('home', '/', app.controller.home.index);

  app.get('about', '/about', 'home.about');
};
