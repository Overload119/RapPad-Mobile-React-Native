import {COLORS} from '../constants/Colors';
import React, {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

class RPButton extends React.Component {
  static propTypes: {
    disabled: React.PropTypes.bool
  };
  render() {
    let innerNodes = this.props.children;
    if (typeof this.props.children === 'string') {
      innerNodes = (
        <Text style={{ color: COLORS.LIGHT_GRAY }}>
          {this.props.children}
        </Text>
      );
    }

    let styleByProps = {
      backgroundColor: this.props.disabled ?
        COLORS.GRAY :
        this.props.color || COLORS.PURPLE
    };

    return (
      <TouchableOpacity
        onPress={this.props.disabled ? null : this.props.onPress}
        style={[styles.button, this.props.style, styleByProps]}>
        {innerNodes}
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PURPLE,
    padding: 8,
    borderRadius: 2,
  }
});

export default RPButton;
