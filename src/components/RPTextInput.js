import {COLORS} from '../constants/Colors';
import React, {TextInput, StyleSheet} from 'react-native';

class RPTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        style={[styles.textInput, this.props.style]}
        placeholderTextColor={COLORS.GRAY}
      />
    );
  }
}

let styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.FORM,
    color: COLORS.LIGHT_GRAY,
    height: 40
  }
});

export default RPTextInput;
