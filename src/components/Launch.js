/**
* This should check to see if logged in. If it is, redirect to Dashboard.
* If not logged in, show logo and auth buttons.
**/

import React, {View, Text, StyleSheet, Dimensions, Image, Animated} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'
import {COLORS} from '../constants/Colors'
import RPLink from './RPLink';

class Launch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacityValue: new Animated.Value(0),
      bottomYOffsetValue: new Animated.Value(-80)
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={styles.logo}
          source={require('../images/logo.png')}
          style={{
            width: 120,
            height: 120,
            borderRadius: 8,
            opacity: this.state.opacityValue
          }}
        />
        <Animated.View style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: this.state.bottomYOffsetValue
        }}>
          <RPLink style={styles.authButton}>Log In</RPLink>
          <RPLink style={styles.authButton}>Sign Up</RPLink>
        </Animated.View>
      </View>
    );
  }
  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.opacityValue, { duration: 1000, toValue: 1 }),
      Animated.timing(
        this.state.bottomYOffsetValue,
        { duration: 1000, toValue: 0 }
      ),
    ]).start();
  }
}

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let styles = StyleSheet.create({
  bottomBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  authButton: {
    width: deviceWidth / 2,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.BASE,
  }
});

module.exports = Launch;
