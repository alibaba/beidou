import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { Section } from '../layout';

/* eslint-disable react/no-multi-comp */

class ModalFooterDemo extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
}

function error() {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}

function success2() {
  const modal = Modal.success({
    title: 'This is a notification message',
    content: 'This modal will be destroyed after 2 seconds',
  });
  setTimeout(() => modal.destroy(), 2000);
}

export default class ModalDemo extends Component {
  state = {
    visible: false,
    ModalText: 'Content of the modal',
    visible2: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk2 = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible2: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel2 = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible2: false,
    });
  };

  render() {
    const { visible2, confirmLoading, ModalText } = this.state;
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="基本">
                <Button type="primary" onClick={this.showModal}>
                  Open
                </Button>
                <Modal
                  title="Basic Modal"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="自定义页脚">
                <ModalFooterDemo />
              </Section>
            </Col>
            <Col span={24}>
              <Section title="手动移除">
                <Button onClick={success2}>Success</Button>
              </Section>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={24}>
              <Section title="异步关闭">
                <Button type="primary" onClick={this.showModal2}>
                  Open
                </Button>
                <Modal
                  title="Title"
                  visible={visible2}
                  onOk={this.handleOk2}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel2}
                >
                  <p>{ModalText}</p>
                </Modal>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="确认对话框">
                <Button onClick={showConfirm}>Confirm</Button>
                <Button onClick={showDeleteConfirm} type="dashed">
                  Delete
                </Button>
              </Section>
            </Col>
            <Col span={24}>
              <Section title="信息提示">
                <Button onClick={info}>Info</Button>
                <Button onClick={success}>Success</Button>
                <Button onClick={error}>Error</Button>
                <Button onClick={warning}>Warning</Button>
              </Section>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
