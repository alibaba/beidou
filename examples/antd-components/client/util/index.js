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
  {
    title: 'Alert 警告提示',
    name: 'alert',
  },
  {
    title: 'Modal 对话框',
    name: 'modal',
  },
  {
    title: 'Message 全局提示',
    name: 'message',
  },
  {
    title: 'Notification 通知提醒框',
    name: 'notification',
  },
  {
    title: 'Progress 进度条',
    name: 'progress',
  },
  {
    title: 'Popconfirm 气泡确认框',
    name: 'popconfirm',
  },
  {
    title: 'Spin 加载中',
    name: 'spin',
  },
  {
    title: 'Anchor 锚点',
    name: 'anchor',
  },
  {
    title: 'BackTop 回到顶部',
    name: 'backtop',
  },
  {
    title: 'Divider 分割线',
    name: 'divider',
  },
  {
    title: 'LocaleProvider 国际化',
    name: 'localeprovider',
  },
  {
    title: 'TreeSelect树选择',
    name: 'treeselect',
  },
  {
    title: 'TimePicker时间选择框',
    name: 'timepicker',
  },
  {
    title: 'Transfer 穿梭框',
    name: 'transfer',
  },
  {
    title: 'Upload 上传',
    name: 'upload',
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
