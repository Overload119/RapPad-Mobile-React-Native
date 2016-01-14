/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import {AppRegistry} from 'react-native';
import App from './src/components/App';

class Root extends App {
  static defaultProps = {
    ...App.defaultProps,
    instructions: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    platform: "os"
  }
}

AppRegistry.registerComponent('App', () => Root);
