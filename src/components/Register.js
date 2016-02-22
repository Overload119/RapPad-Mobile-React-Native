/**
* This screen handles registration for a new user on the app.
* After the user signs up successfully, it'll redirect them to the Dashboard.
**/
import React, {View, StyleSheet, Text, Alert,BackAndroid} from 'react-native';

import API from '../lib/API';
import RPButton from './RPButton'
import RPLink from './RPLink'
import RPRouter from '../lib/RPRouter';
import RPStorage from '../lib/RPStorage';
import RPTextInput from './RPTextInput'
import {COLORS} from '../constants/Colors';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }
  async requestSignup() {
    this.setState({ isLoading: true });
    try {
      let request = await API.register({
        email: this.state.email,
        password: this.state.password
      });
      if (request.response.status === 200 ) {
        await RPStorage.setUserSession(request.body);
        this.props.navigator.push(RPRouter.getHomeRoute());
        return;
      }
      this.setState({
        error: request.body,
        isLoading: false
      });
    }
    catch (error) {
      Alert.alert('Signup Error', 'Error')
      this.setState({
        error: 'Could not reach the server.',
        isLoading: false
      });
      throw error;
    }
  }
  handleOnLoginTextChanged(textValue) {
    this.setState({ email: textValue })
  }
  handleOnPasswordTextChanged(textValue) {
    this.setState({ password: textValue })
  }
  handlePressLogin() {
    this.requestSignup();
  }
  handlePressGoBack() {
    this.props.navigator.pop();
  }
  render() {
    let errorText = null;
    if (this.state.error) {
      errorText = <Text style={styles.error}>{this.state.error}</Text>
    }

    return (
      <View style={styles.container}>
        {errorText}
        <RPTextInput
          placeholder={'Email Address'}
          style={styles.textInput}
          onChangeText={this.handleOnLoginTextChanged.bind(this)}
          value={this.state.email}
        />
        <RPTextInput
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={this.handleOnPasswordTextChanged.bind(this)}
          value={this.state.password}
        />
        <View style={styles.loginButtons}>
          <RPButton
            style={[styles.loginButton, styles.loginButtonLeft]}
            onPress={this.handlePressLogin.bind(this)}
            disabled={this.state.isLoading}>
            Sign Up!
          </RPButton>
          <RPButton
            style={[styles.loginButton, styles.loginButtonRight]}
            color={COLORS.BLUE}
            disabled={this.state.isLoading}>
            <Text style={{color: COLORS.WHITE}}>
              Facebook
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
    color: COLORS.LIGHT_GRAY,
    padding: 8
  },
  error: {
    width: 260,
    padding: 8,
    marginBottom: 8,
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE
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

export default Register;
module.exports = Register;
