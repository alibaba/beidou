import { Controller } from 'egg';

export default class HomeController extends Controller {
  async index() {
    // render view template in `client/page`
    const from = await this.ctx.service.contact.getFrom();
    await this.ctx.render('page', { from });
  }
}

