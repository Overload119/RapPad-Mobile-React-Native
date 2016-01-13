import Button from 'react-native-button';
import {COLORS} from '../constants/Colors';
import React, {StyleSheet} from 'react-native';

class RPButton extends React.Component {
  render() {
    return (
      <Button style={styles.button}>
        {this.props.children}
      </Button>
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
