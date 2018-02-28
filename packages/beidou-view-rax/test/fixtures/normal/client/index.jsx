import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.css';

class App extends Component {
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appBanner}>Beidou with Rax</Text>
        </View>
        <Text style={styles.appIntro}>
          To get started, edit src/App.js and save to reload.
        </Text>
        <Text>Asset 'index.js' url: {this.props.helper.asset('index.js')}</Text>
      </View>
    );
  }
}

export default App;
