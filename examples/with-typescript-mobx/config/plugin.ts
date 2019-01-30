import { EggPlugin } from 'beidou';

const plugin: EggPlugin = {
  static: true,
  security: true,
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

export default plugin;
