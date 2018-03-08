const Mock = require('mockjs');
const moment = require('moment');

module.exports = ({ Service }) => {
  class UserService extends Service {
    constructor(ctx) {
      super(ctx);
      this.user = this.ctx.db.user;
    }

    async find(username, password) {
      if (username === 'beidou' && password === 'admin') {
        return {
          name: 'beidou',
          nickName: 'bey',
        };
      }
      const user = this.user.findOne({
        username,
        password,
      });
      return user;
    }

    async findAll(limit = 50) {
      const user = this.user.find();
      return user.slice(0, limit);
    }

    async create(name, nickName, isMale, age, phone, email, address) {
      const avatar = Mock.Random.image(
        '100x100',
        Mock.Random.color(),
        '#757575',
        'png',
        name.substr(0, 1)
      );
      const createTime = moment().format('YY/MM HH:mm:ss');
      const password = 'admin';
      const username = name;
      const user = this.user.save({
        avatar,
        name,
        username,
        password,
        nickName,
        isMale,
        age,
        phone,
        email,
        address,
        createTime,
      });
      return user;
    }

    async delete(_id) {
      this.user.remove({ _id }, false);
    }
  }

  return UserService;
};
