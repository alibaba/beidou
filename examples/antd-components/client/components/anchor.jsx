import React, { Component } from 'react';
import { Anchor, Row, Col } from 'antd';
import { Section } from '../layout';

const { Link } = Anchor;

export default class AnchorDemo extends Component {
  state = {};

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Anchor>
                  <Link
                    href="#components-anchor-demo-basic"
                    title="Basic demo"
                  />
                  <Link
                    href="#components-anchor-demo-fixed"
                    title="Fixed demo"
                  />
                  <Link href="#API" title="API">
                    <Link href="#Anchor-Props" title="Anchor Props" />
                    <Link href="#Link-Props" title="Link Props" />
                  </Link>
                </Anchor>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="静态位置">
                <Anchor affix={false}>
                  <Link
                    href="#components-anchor-demo-basic"
                    title="Basic demo"
                  />
                  <Link
                    href="#components-anchor-demo-fixed"
                    title="Fixed demo"
                  />
                  <Link href="#API" title="API">
                    <Link href="#Anchor-Props" title="Anchor Props" />
                    <Link href="#Link-Props" title="Link Props" />
                  </Link>
                </Anchor>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
