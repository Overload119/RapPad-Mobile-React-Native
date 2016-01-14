/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import {AppRegistry} from 'react-native';
import App from './src/components/App';

class Root extends App {
  static defaultProps = {
    ...App.defaultProps,
    instructions: 'Shake or press menu button for dev menu',
    platform: "android"
  }
}

AppRegistry.registerComponent('App', () => Root);
