module.exports = (app) => {
  class HomeController extends app.Controller {
    * index() {
      // render view template in `app/views`
      yield this.ctx.render('home');
    }

    * about() {
      // call service
      const contacts = yield this.service.contact.list();
      // render view template in `client/`
      yield this.ctx.render('about', { contacts });
    }
  }

  return HomeController;
};
