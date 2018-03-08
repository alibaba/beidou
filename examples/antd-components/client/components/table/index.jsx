'use strict';

import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Section } from '../../layout';
import Basic from './basic';
import JsxStyle from './jsx-style';
import Selectable from './selectable';
import Operation from './operation';
import Options from './options';
import CSort from './controlled-sort';
import Sort from './sort';
import Menu from './menu';
import Remote from './remote';
import Tiny from './tiny';
import Border from './border';
import Expandable from './expandable';
import Combine from './combine';
import Tree from './tree';
import FixHead from './fix-head';
import FixColumn from './fix-column';
import Fix from './fix';
import Group from './group';
import ECell from './editable-cell';
import ERow from './editable-row';
import Nested from './nested';
import Draggable from './draggable';
import Dynamic from './dynamic';
import './index.less';

export default class Demo extends Component {
  render() {
    return (
      <div id="components-table-demo">
        <Row gutter={16}>
          <Col span={24}>
            <Section title="基本用法">
              <Basic />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="JSX 风格的 API">
              <JsxStyle />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="可选择">
              <Selectable />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="选择和操作">
              <Operation />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="自定义选择项">
              <Options />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="可控的筛选和排序">
              <CSort />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="筛选和排序">
              <Sort />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="自定义筛选菜单">
              <Menu />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="远程加载数据">
              <Remote />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="紧凑型">
              <Tiny />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="带边框">
              <Border />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="可展开">
              <Expandable />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="表格行/列合并">
              <Combine />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="树形数据展示">
              <Tree />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="固定表头">
              <FixHead />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="固定列">
              <FixColumn />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="固定头和列">
              <Fix />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="表头分组">
              <Group />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="可编辑单元格">
              <ECell />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="可编辑行">
              <ERow />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="嵌套子表格">
              <Nested />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="拖拽排序">
              <Draggable />
            </Section>
          </Col>

          <Col span={24}>
            <Section title="动态控制表格属性">
              <Dynamic />
            </Section>
          </Col>
        </Row>
      </div>
    );
  }
}
