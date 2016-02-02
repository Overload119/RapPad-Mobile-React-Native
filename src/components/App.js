import React, {Component, PropTypes, Platform, StyleSheet, Text, View, Alert} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import Home from './Home';
import Launch from './Launch';
import RPRouter from '../lib/RPRouter';
import RPStorage from '../lib/RPStorage';
import {COLORS} from '../constants/Colors';

export default class App extends Component {
  static propTypes = {
    instructions: PropTypes.string,
  };

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Platform.OS,
      isLoggedIn: false
    };
  }
  render() {
    return (
      <ExNavigator
        initialRoute={RPRouter.getLaunchRoute()}
        showNavigationBar={false}
      />
    );
  }
}

module.exports = App;
