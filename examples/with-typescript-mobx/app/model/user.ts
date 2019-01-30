import { Application } from 'beidou';
import { Instance } from 'sequelize';

export default (app: Application) => {
  const { Sequelize, model } = app;

  const User = model.define<Instance<IUser>, IUser>('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '主键ID自增',
    },
    name: {
      type: Sequelize.STRING,
      comment: '姓名',
    },
    email: {
      type: Sequelize.STRING,
      comment: '邮箱',
    },
  }, {
    timestamps: false,
    tableName: 'user',
    underscored: true,
  });

  User.associate = () => {
    // associate
  };

  return User;
};
