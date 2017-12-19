module.exports = (app) => {
  app.role.failureHandler = function (ctx) {
    if (ctx.acceptJSON) {
      ctx.body = { stat: 'deny' };
    } else {
      ctx.realStatus = 200;
      ctx.redirect(`/login${ctx.request.search}`);
    }
  };

  app.role.use('user', ctx => ctx.session.user !== null);
};
