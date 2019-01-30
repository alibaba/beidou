import { Controller } from 'beidou';
// import d from 'debug';

// const debug = d('runner:api:user');

export default class UserApiController extends Controller {

  async index() {
    const { ctx } = this;

    const user = await ctx.service.user.findAll();

    ctx.success(user);
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    const user = await ctx.service.user.findById(id);

    ctx.success(user);
  }

  async create() {
    const { ctx } = this;
    const { name, email } = ctx.request.body;
    const user = await ctx.service.user.create({ name, email });

    ctx.success(user);
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, email } = ctx.request.body;
    const success = await ctx.service.user.update(id, { name, email });
    if (success) {
      ctx.success(await ctx.service.user.findById(id));
    }
  }
}
