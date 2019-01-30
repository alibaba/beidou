import { Controller } from 'beidou';
export default class FiberController extends Controller {
  async list() {
    const { ctx } = this;
    const list = await ctx.service.user.findAll();
    const users = {};
    list.forEach((u) => {
      users[u.id] = u;
    });
    await ctx.render('pages/main/index.tsx', {
      data: {
        user: {
          list,
          users,
        },
      },
    });
  }
  async create() {
    const { ctx } = this;
    // const { id } = ctx.params;
    await ctx.render('pages/main/index.tsx');
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const current = await ctx.service.user.findById(id);
    await ctx.render('pages/main/index.tsx', {
      data: {
        user: {
          currentId: current.id,
          users: {
            [current.id]: current,
          },
        },
      },
    });
  }
}
