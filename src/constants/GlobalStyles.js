import React, {StyleSheet} from 'react-native';
import {COLORS} from './Colors';

export const GlobalStyles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.GRAY
  },
  white: {
    color: COLORS.WHITE
  },
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
    margin: 12
  },
  marginVert: {
    marginTop: 12,
    marginBottom: 12
  },
  textCenter: {
    textAlign: 'center'
  },
  marginBottom: {
    marginBottom: 12
  }
});
