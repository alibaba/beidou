'use strict';

const configs = [
  {
    title: 'Button 按钮',
    name: 'button',
  },
  {
    title: 'Icon 图标',
    name: 'icon',
  },
  {
    title: 'Grid 栅格',
    name: 'grid',
  },
  {
    title: 'Affix 固钉',
    name: 'affix',
  },
  {
    title: 'Breadcrumb 面包屑',
    name: 'breadcrumb',
  },
  {
    title: 'Dropdown 下拉菜单',
    name: 'dropdown',
  },
  {
    title: 'Menu 导航菜单',
    name: 'menu',
  },
];
exports.listComponents = function () {
  return configs.map(({ title, name }) => {
    const component = require(`../components/${name}`);

    return {
      title,
      name,
      value: component.default || component,
    };
  });
};
