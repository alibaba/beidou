'use strict';

import React from 'react';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

export default class Complete extends React.Component {
  state = {
    result: [],
  };

  handleSearch = (value) => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map(
        domain => `${value}@${domain}`
      );
    }
    this.setState({ result });
  };

  render() {
    const { result } = this.state;
    const children = result.map(email => <Option key={email}>{email}</Option>);
    return (
      <AutoComplete
        style={{ width: 200 }}
        onSearch={this.handleSearch}
        placeholder="input here"
      >
        {children}
      </AutoComplete>
    );
  }
}
