/**
/* TODO: Make this fade in an image once the image has loaded and handle default
   images on Android.
**/

import {COLORS} from '../constants/Colors';
import React, {Image, Alert} from 'react-native';

export default class RPImage extends React.Component {
  render() {
    // Android doesn't support defaultSource, so we manually set the source.
    // Also, the serve returns local paths sometimes, we fix them to be
    // completely local.

    let source = this.props.source;

    if (!source.uri || source.uri === '/images/default_rap.png') {
      source = this.props.defaultSource;
    }

    return (
      <Image
        style={this.props.style}
        source={source}
        defaultSource={this.props.defaultSource}
      />
    );
  }
}
