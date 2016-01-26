import React, {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants/Colors';
import API from '../lib/API';
import RPTextInput from './RPTextInput'
import RPButton from './RPButton'
import RPLink from './RPLink'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  async requestLogin() {
    try {
      let response = await API.login();
    }
    catch (error) {
      throw error;
    }
  }
  componentWillMount() {
  }
  handlePressLogin() {
    this.requestLogin();
  }
  handlePressGoBack() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No errors.</Text>
        <RPTextInput
          placeholder={'Username or Email'}
          style={styles.textInput}
        />
        <RPTextInput
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <View style={styles.loginButtons}>
          <RPButton style={[styles.loginButton, styles.loginButtonLeft]}>
            Login
          </RPButton>
          <RPButton
            style={[styles.loginButton, styles.loginButtonRight]}
            color={COLORS.BLUE}>
            <Text style={{color: COLORS.WHITE}}>
              Login
            </Text>
          </RPButton>
        </View>
        <RPLink onPress={this.handlePressGoBack.bind(this)}>Go Back</RPLink>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE
  },
  textInput: {
    width: 260,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY,
    marginBottom: 8,
    padding: 8
  },
  error: {
    padding: 8,
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,
    opacity: 0
  },
  loginButtons: {
    flexDirection: 'row',
    marginBottom: 12
  },
  loginButton: {
    width: 125
  },
  loginButtonLeft: {
    marginRight: 10
  },
  loginButtonRight: {
  }
});

export default Login;
module.exports = Login;
