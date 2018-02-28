import 'babel-polyfill';
import { Component, hydrate, createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'rax-redux';

const styles = {
  main: {
    flex: 1,
    paddingTop: 36,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opt: {
    flexDirection: 'row',
    marginTop: 28,
    justifyContent: 'center',
  },
  text: {
    fontSize: 38,
    lineHeight: 38,
  },
  btn: {
    fontSize: 38,
    lineHeight: 38,
    marginRight: 12,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#333333',
    width: 38,
    height: 38,
    alignItems: 'center',
    textAlign: 'center',
  },
  set: {
    width: 200,
  },
};

function content(
  state = {
    text: 'Value',
  },
  action = {}
) {
  switch (action.type) {
    case 'content/set':
      return Object.assign({}, state, {
        text: action.text,
      });
    default:
      return state;
  }
}

function counter(
  state = {
    count: 0,
  },
  action = {}
) {
  switch (action.type) {
    case 'counter/add':
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case 'counter/minus':
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    default:
      return state;
  }
}

class Page extends Component {
  render() {
    const { counter, content, dispatch } = this.props;
    const { count } = counter;
    const { text } = content;

    return (
      <View style={styles.main}>
        <View style={styles.box}>
          <Text style={styles.text}>{text}：</Text>
          <Text style={styles.text}>{count}</Text>
        </View>
        <View style={styles.opt}>
          <Text
            style={styles.btn}
            onPress={() => {
              dispatch({ type: 'counter/add' });
            }}
          >
            +
          </Text>
          <Text
            style={styles.btn}
            onPress={() => {
              dispatch({ type: 'counter/minus' });
            }}
          >
            -
          </Text>
          <Text
            style={[styles.btn, styles.set]}
            onPress={() => {
              dispatch({ type: 'content/set', text: 'New Value' });
            }}
          >
            Set text
          </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.content,
    counter: state.counter,
  };
}

const App = connect(mapStateToProps)(Page);

class Entry extends Component {
  static async getStore(props) {
    // console.log(`request props: ${JSON.stringify(props, null, 2)}`);
    return createStore(
      combineReducers({
        content,
        counter,
      })
    );
  }

  static async getPartial({ store }) {
    // console.log(`request props: ${JSON.stringify(props, null, 2)}`);
    const html = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    return {
      html,
    };
  }

  render() {
    const { html, state, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example with rax-redux</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${state}`,
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__SERVER__) {
  module.exports = Entry;
}

if (__CLIENT__) {
  let store = null;
  if (__DEV__ && typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    store = createStore(
      combineReducers({
        content,
        counter,
      }),
      window.__INITIAL_STATE__,
      __REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    store = createStore(
      combineReducers({
        content,
        counter,
      }),
      window.__INITIAL_STATE__
    );
  }
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container')
  );
}
