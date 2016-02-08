import React, {StyleSheet} from 'react-native';
import {COLORS} from './Colors';

export const GlobalStyles = StyleSheet.create({
  gray: {
    color: COLORS.GRAY
  },
  smallText: {
    fontSize: 12
  },
  paddingVert: {
    paddingTop: 4,
    paddingBottom: 4
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  marginAll: {
  },
  marginVert: {
    marginTop: 12,
    marginBottom: 12
  }
});
