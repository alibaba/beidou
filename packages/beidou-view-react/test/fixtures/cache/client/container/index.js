const React = require('react');
const ReactRedux = require('react-redux');
const News = require('../components/news');

class App extends React.Component {
  render() {
    return (
      <div>
        <News data={this.props.data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

module.exports = ReactRedux.connect(mapStateToProps)(App);
