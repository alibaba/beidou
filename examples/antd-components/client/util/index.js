'use strict';

const configs = [
  {
    title: 'General',
    list: [
      {
        title: 'Button 按钮',
        name: 'button',
      },
      {
        title: 'Icon 图标',
        name: 'icon',
      },
    ],
  },
  {
    title: 'Layout',
    list: [
      {
        title: 'Grid 栅格',
        name: 'grid',
      },
      {
        title: 'Layout 布局',
        name: 'layout',
      },
    ],
  },
  {
    title: 'Navigation',
    list: [
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
    ],
  },

  {
    title: 'Data Entry',
    list: [
      {
        title: 'AutoComplete 自动完成',
        name: 'autocomplete',
        path: 'auto-complete/index',
      },
      {
        title: 'Cascader 级联',
        name: 'cascader',
        path: 'cascader/index',
      },
      {
        title: 'Checkbox 多选框',
        name: 'checkbox',
      },
      {
        title: 'DatePicker 日期选择框',
        name: 'datepicker',
        path: 'datepicker/index',
      },
      {
        title: 'Form 表单',
        name: 'form',
        path: 'form/index',
      },
      {
        title: 'Input 输入框',
        name: 'input',
        path: 'input/index',
      },
      {
        title: 'InputNumber 数字输入框',
        name: 'inputnumber',
        path: 'inputnumber/index',
      },
      {
        title: 'Mention 提及',
        name: 'mention',
        path: 'mention/index',
      },
      {
        title: 'Rage 评分',
        name: 'rate',
        path: 'rate/index',
      },
      {
        title: 'Radio 单选框',
        name: 'radio',
        path: 'radio/index',
      },
      {
        title: 'Select 选择器',
        name: 'select',
        path: 'select/index',
      },
      {
        title: 'Slider 滑动输入条',
        name: 'slider',
        path: 'slider/index',
      },
      {
        title: 'Switch 开关',
        name: 'switch',
        path: 'switch/index',
      },
    ],
  },

  {
    title: 'Data Display',
    list: [
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
        name: 'table',
        path: 'table/index',
      },
      {
        title: 'Tabs 标签页',
        name: 'tabs',
      },
      {
        title: 'Tag 标签',
        name: 'tag',
        path: 'tag/index',
      },
      {
        title: 'Timeline 时间轴',
        name: 'timeline',
      },
      {
        title: 'Tree 树形控件',
        name: 'tree',
        path: 'tree/index',
      },
    ],
  },
  {
    title: 'Feedback',
    list: [
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
    ],
  },

  {
    title: 'Other',
    list: [
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
    ],
  },
];

exports.listComponents = function () {
  return configs.map(item => ({
    title: item.title,
    list: item.list.map(({ title, name, path }) => {
      const component = require(`../components/${path || name}`);
      return {
        title,
        name,
        value: component.default || component,
      };
    }),
  }));
};
