'use strict';

module.exports = (app) => {
  app.role.failureHandler = function () {
    if (this.acceptJSON) {
      this.body = { stat: 'deny' };
    } else {
      this.realStatus = 200;
      this.redirect(`/login${this.request.search}`);
    }
  };

  app.role.use('user', function () {
    return this.session.user !== undefined;
  });
};
