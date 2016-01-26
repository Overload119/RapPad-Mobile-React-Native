import React, {View, Text, StyleSheet, Dimensions, Image, Animated, Alert, Navigator} from 'react-native';
import {COLORS} from '../constants/Colors';
import RPLink from './RPLink';
import RPRouter from '../lib/RPRouter.js';

class Launch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacityValue: new Animated.Value(0),
      bottomYOffsetValue: new Animated.Value(-80)
    };
  }
  handlePressRegister() {
    this.props.navigator.push(RPRouter.getRegisterRoute());
  }
  handlePressLogin() {
    this.props.navigator.push(RPRouter.getLoginRoute());
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
          <RPLink
            style={styles.authButton}
            onPress={this.handlePressLogin.bind(this)}>
            Log In
          </RPLink>
          <RPLink
            style={styles.authButton}
            onPress={this.handlePressRegister.bind(this)}>
            Sign Up
          </RPLink>
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

export default Launch;
module.exports = Launch;
