import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.css';
import assert from 'assert';

let context;
let req;

class App extends Component {
  static async getStore({ ctx, request }) {
    context = ctx;
    req = request;
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ctx, request });
      }, 500);
    })
  }

  static async getPartial({ store }) {
    assert(store.ctx === context);
    assert(store.request === req);
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          html: (<Text>Partial render</Text>),
        });
      }, 500);
    });
  }

  render() {
    const { html } = this.props;
    assert(/Partial render/.test(html));

    return (
      <View style={styles.app}>
        <View style={styles.appHeader}>
          <Text style={styles.appBanner}>Beidou with Rax</Text>
        </View>
        <Text style={styles.appIntro}>
          To get started, edit src/App.js and save to reload.
        </Text>
        <View dangerouslySetInnerHTML={{__html: html}} />
      </View>
    );
  }
}

export default App;
