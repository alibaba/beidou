import React, { Component } from 'react';
import { Row, Col, Alert } from 'antd';
import { Section } from '../layout';
import { Wrapper } from '../util/helpers';

const onClose = function (e) {
  console.log(e, 'I was closed.');
};

export default class AlertDemo extends Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Alert message="Success Text" type="success" />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="可关闭的警告提示">
                <Wrapper>
                  <Alert
                    message={
                      'Warning Text Warning Text Warning TextWarning' +
                      'Text Warning Text Warning TextWarning Text'
                    }
                    type="warning"
                    closable
                    onClose={onClose}
                  />
                </Wrapper>
                <Wrapper>
                  <Alert
                    message="Error Text"
                    description={
                      'Error Description Error Description Error ' +
                      'Description Error Description Error Description ' +
                      'Error Description'
                    }
                    type="error"
                    closable
                    onClose={onClose}
                  />
                </Wrapper>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="图标/含有辅助性文字介绍">
                <Wrapper>
                  <Alert message="Success Tips" type="success" showIcon />
                </Wrapper>
                <Wrapper>
                  <Alert message="Informational Notes" type="info" showIcon />
                </Wrapper>
                <Wrapper>
                  <Alert message="Warning" type="warning" showIcon />
                </Wrapper>
                <Wrapper>
                  <Alert message="Error" type="error" showIcon />
                </Wrapper>
                <Wrapper>
                  <Alert
                    message="Success Tips"
                    description="Detailed description about copywriting."
                    type="success"
                    showIcon
                  />
                </Wrapper>
                <Wrapper>
                  <Alert
                    message="Informational Notes"
                    description="Additional description about copywriting."
                    type="info"
                    showIcon
                  />
                </Wrapper>
                <Wrapper>
                  <Alert
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                    showIcon
                  />
                </Wrapper>
                <Wrapper>
                  <Alert
                    message="Error"
                    description="This is an error message about copywriting."
                    type="error"
                    showIcon
                  />
                </Wrapper>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="四种样式">
                <Wrapper>
                  <Alert message="Success Text" type="success" />
                </Wrapper>
                <Wrapper>
                  <Alert message="Info Text" type="info" />
                </Wrapper>
                <Wrapper>
                  <Alert message="Warning Text" type="warning" />
                </Wrapper>
                <Wrapper>
                  <Alert message="Error Text" type="error" />
                </Wrapper>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="顶部公告">
                <Alert message="Warning text" banner />
                <br />
                <Alert
                  message="Very long warning text warning text text text"
                  banner
                  closable
                />
                <br />
                <Alert
                  showIcon={false}
                  message="Warning text without icon"
                  banner
                />
                <br />
                <Alert type="error" message="Error text" banner />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义关闭">
                <Alert message="Info Text" type="info" closeText="Close Now" />
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
