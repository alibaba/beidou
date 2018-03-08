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
  {
    title: 'Pagination 分页',
    name: 'pagination',
  },
  {
    title: 'Steps 步骤条',
    name: 'steps',
  },
  {
    title: 'Avatar 头像',
    name: 'avatar',
  },
  {
    title: 'Badge 徽标数',
    name: 'badge',
  },
  {
    title: 'Calendar 日历',
    name: 'calendar',
  },
  {
    title: 'Card 卡片',
    name: 'card',
  },
  {
    title: 'Carousel 走马灯',
    name: 'carousel',
  },
  {
    title: 'Collapse 折叠面板',
    name: 'collapse',
  },
  {
    title: 'List 列表',
    name: 'list',
  },
  {
    title: 'Popover 气泡卡片',
    name: 'popover',
  },
  {
    title: 'Tooltop 文字提示',
    name: 'tooltip',
  },
  {
    title: 'Table 表格',
    name: 'table/index',
  },
  {
    title: 'Tabs 标签',
    name: 'tabs',
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
