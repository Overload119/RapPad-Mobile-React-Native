import React, {Component, WebView, Platform, StyleSheet, Text, View, Alert} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import Home from './Home';
import Launch from './Launch';
import RPRouter from '../lib/RPRouter';
import API from '../lib/API';
import RPStorage from '../lib/RPStorage';
import {COLORS} from '../constants/Colors';

export default class Forum extends Component {
  constructor(props, context) {
    super(props, context);
    html =
      `<html>
        <body>
          <p>Hello World!</p>
        </body>
      </html>`;
    this.state = {
      html: html
    }
  }
  handleRenderError() {
  }
  handleOnLoad() {
  }
  async componentDidMount() {
    // TODO - setup a light version of this.
    let discussParams = await API.getDiscussParams().body;
    html =
      `<html>
        <head>
        </head>
        <body>
          <p>Loaded!</p>
        </body>
      </html>`
    this.setState({ html: html });
  }
  render() {
    return (
      <WebView
        style={styles.web}
        url={'https://www.rappad.co/forum'}
        renderError={this.handleRenderError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  web: {
    backgroundColor: COLORS.GRAY,
    flex: 1
  }
});

module.exports = Forum;
