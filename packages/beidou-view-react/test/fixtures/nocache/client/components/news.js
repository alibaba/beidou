const React = require('react');

class News extends React.Component {
  getDefaultProps() {
    return {
      name: '',
    };
  }

  render() {
    return <div>{this.props.data.name}</div>;
  }
}

module.exports = News;
