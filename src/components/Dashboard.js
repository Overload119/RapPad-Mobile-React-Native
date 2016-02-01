/**
* Dashboard screen shows all raps a user has made.
**/

import React, {View, Text, StyleSheet} from 'react-native';

import {COLORS} from '../constants/Colors'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>You are logged in and on your Dashboard!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BASE,
    flex: 1
  }
});

export default Dashboard;
module.exports = Dashboard;
