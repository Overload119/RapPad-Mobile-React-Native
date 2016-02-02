import React, {Component, Platform, StyleSheet, Text, View, Alert} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import Home from './Home';
import Launch from './Launch';
import RPRouter from '../lib/RPRouter';
import RPStorage from '../lib/RPStorage';
import {COLORS} from '../constants/Colors';

export default class Editor extends Component {
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
