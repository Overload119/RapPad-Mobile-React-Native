import {COLORS} from '../constants/Colors';
import React, {StyleSheet} from 'react-native';

class RPButton extends React.Component {
  render() {
    return (
      <View onPress={this.props.onPress} style={styles.button}>
        <Text style={[styles.button, this.props.style]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PURPLE,
    color: COLORS.LIGHT_GRAY,
    padding: 1,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1
  }
});

export default RPButton;
