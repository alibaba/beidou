import React from 'react';

import { Mention } from 'antd';

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];

class AsyncMention extends React.Component {
  state = {
    suggestions: [],
    loading: false,
  };
  onSearchChange = (value) => {
    this.fetchSuggestions(value, (suggestions) => {
      this.setState({
        suggestions,
        loading: false,
      });
    });
    this.setState({
      loading: true,
    });
  };
  fetchSuggestions = (value, callback) => {
    setTimeout(() => {
      callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  };
  render() {
    const { suggestions, loading } = this.state;
    return (
      <Mention
        style={{ width: '100%' }}
        loading={loading}
        suggestions={suggestions}
        onSearchChange={this.onSearchChange}
      />
    );
  }
}

export default AsyncMention;
