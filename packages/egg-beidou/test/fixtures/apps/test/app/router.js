module.exports = app => {
  app.get('home', '/', 'home.index');
  app.get('redux', '/redux', 'redux.index');
  app.get('redux/page', '/redux/page', 'redux.page');
  app.get('spa', '/spa', 'spa.index');
  app.get('miss', '/miss', 'home.miss');
  app.get('ssr', '/ssr', 'home.ssr');
  app.get('suffix', '/suffix', 'home.suffix');
  app.get('suffixpath', '/suffixpath', 'home.suffixpath');
};
