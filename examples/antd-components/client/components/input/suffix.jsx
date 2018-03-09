import React from 'react';

import { Input, Icon } from 'antd';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  };

  render() {
    const { userName } = this.state;
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    return (
      <Input
        placeholder="Enter your username"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={node => (this.userNameInput = node)}
      />
    );
  }
}
