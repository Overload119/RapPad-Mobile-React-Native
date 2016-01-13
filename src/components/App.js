/**
 * React Native Webpack Starter Kit
 * https://github.com/jhabdas/react-native-webpack-starter-kit
 */
import React, {Component, PropTypes} from 'react-native';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux';
import Launch from './Launch.js';
import Button from 'react-native-button';

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
      <Launch />
    );
  }
}

export default App;
