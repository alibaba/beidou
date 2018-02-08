import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

class App extends Component {
  render() {
    return (
      <View style={{
          fontSize: 2,
          flex: 1,
          'justify-content': 'center',
          'align-items': 'center'
        }}>
        <Text style={{ background: 'blue', marginTop: '4' }}>Inline style</Text>
      </View>
    );
  }
}

export default App;
