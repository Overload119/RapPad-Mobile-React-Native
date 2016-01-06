/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component, PropTypes} from 'react-native';

const {
  Platform,
  StyleSheet,
  Text,
  View,
} = React;

class App extends Component {

  static propTypes = {
    instructions: PropTypes.string,
  }

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.',
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Platform.OS,
    };
  }

  render() {
    const { instructions } = this.props;
    let { platform } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to RapPad Mobile!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.{platform}.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
