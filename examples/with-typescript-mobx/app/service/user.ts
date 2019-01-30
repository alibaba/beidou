import { Service, Context } from 'beidou';
import { Sequelize } from 'sequelize';

export default class UserService extends Service {
  private model: Sequelize;
  constructor(ctx: Context) {
    super(ctx);
    this.model = ctx.app.model;
  }

  async create(data) {
    const user = await this.model.User.create({
      name: data.name,
      email: data.email,
    });
    return user;
  }

  async update(id, data) {
    const user = await this.model.User.update({
      name: data.name,
      email: data.email,
    }, {
      where: {
        id,
      },
    });
    return user;
  }

  public async findById(id: number): Promise<IUser> {
    const user = await this.model.User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.model.User.findAll();

    return users.map((u) => u.get({ plain: true }));
  }
}
