import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  GRADIENT_COLOR_SET_2,
} from '../constants/constants';
import LinearGradient from 'react-native-linear-gradient';

export default class NormalButton extends Component {
  render() {
    let {buttonColor, buttonPress, buttonText, buttonTextColor} = this.props;
    let buttonStyle = {...styles.button, ...{backgroundColor: buttonColor}};
    let textStyle = {...styles.text, ...{color: buttonTextColor, fontFamily: "LATO-BOLD"}};
    return (
      <TouchableOpacity style={buttonStyle} onPress={() => buttonPress()}>
        <Text style={textStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH * 0.9,
    borderRadius: DEVICE_WIDTH * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: DEVICE_HEIGHT * 0.03,
  },
});
