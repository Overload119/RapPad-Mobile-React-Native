import React, {View, StyleSheet, Text, Alert} from 'react-native';
import {COLORS} from '../constants/Colors';
import API from '../lib/API';
import RPTextInput from './RPTextInput'
import RPButton from './RPButton'
import RPLink from './RPLink'
import RPRouter from '../lib/RPRouter.js';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      isLoading: false
    }
  }
  async requestLogin() {
    Alert.alert('Alert Title', 'Requested.')
    this.setState({ isLoading: true });
    try {
      let response = await API.login({
        login: this.state.login,
        password: this.state.password
      });
      let responseJSON = await response.json();
      if (response.status === 200) {
        this.props.navigator.push(RPRouter.getHomeRoute());
        return;
      }
      this.setState({
        error: responseJSON.message,
        isLoading: false
      });
    }
    catch (error) {
      Alert.alert('Alert Title', 'Error')
      this.setState({
        error: 'Could not reach the server.',
        isLoading: false
      });
      throw error;
    }
  }
  handleOnLoginTextChanged(textValue) {
    this.setState({ login: textValue })
  }
  handleOnPasswordTextChanged(textValue) {
    this.setState({ password: textValue })
  }
  handlePressLogin() {
    this.requestLogin();
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
          placeholder={'Username or Email'}
          style={styles.textInput}
          onChangeText={this.handleOnLoginTextChanged.bind(this)}
          value={this.state.login}
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
            Login
          </RPButton>
          <RPButton
            style={[styles.loginButton, styles.loginButtonRight]}
            color={COLORS.BLUE}
            disabled={this.state.isLoading}>
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

export default Login;
module.exports = Login;
