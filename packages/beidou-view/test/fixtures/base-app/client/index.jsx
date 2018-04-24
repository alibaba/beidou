import assert from 'assert';

const testStr = 'base view test';

/**
 * Text component
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View {
  static async getInitialProps() {
    return {
      title: 'beidou',
    };
  }
  static async getStore() {
    return {
      getState: () => ({ testStr }),
    };
  }

  static async getPartial(props) {
    assert(props.state === '{"testStr":"base view test"}');
    return { partial: '', list: ['a', 'b', 'c'], store: 'store' };
  }

  render({ partial, list, store, title }) {
    // See view.test.js BaseView.prototype.renderElement
    const partialResult = 'fake renderElement';
    assert(partial === partialResult);

    assert(list.length === 3);
    for (const item of list) {
      assert(item === partialResult);
    }

    assert(store === partialResult);

    assert(title === 'beidou');
  }
}
