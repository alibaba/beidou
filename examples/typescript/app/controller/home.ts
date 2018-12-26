import { Controller } from 'beidou';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const result = await service.date.now();
    ctx.body = result;
  }
}