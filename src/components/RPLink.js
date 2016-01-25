import {COLORS} from '../constants/Colors';
import React, {StyleSheet, Text, TouchableHighlight} from 'react-native';

class RPLink extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Text style={[styles.button, this.props.style]}>
          {this.props.children}
        </Text>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  button: {
    color: COLORS.YELLOW,
  }
});

export default RPLink;
