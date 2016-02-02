/**
* Home screen holds tabs along the top and content within it.
**/

import React, {
  View, Text, Platform, StyleSheet, ViewPagerAndroid
} from 'react-native';

import {COLORS} from '../constants/Colors'
import Dashboard from './Dashboard'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagePosition: 0
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.home}>
        <Text>Not Done</Text>
        <Dashboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: COLORS.BASE,
    flex: 0.1,
    flexDirection: 'column'
  },
  tabBar: {
  },
  viewPager: {
    flex: 1
  }
});

module.exports = Home;
