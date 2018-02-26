import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

class App extends Component {
  render() {
    return (
      <View>
        <Text style={{
          fontSize: 2,
        }}>Rax demo in `views` directory</Text>
      </View>
    );
  }
}

export default App;
