import React, {Component} from 'react';

import {StyleSheet, View, TextInput, Text} from 'react-native';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  GRADIENT_COLOR_SET_2,
} from '../constants/constants';
import LinearGradient from 'react-native-linear-gradient';

export default class Input extends Component {

  render() {
    let {borderColor, placeHolder, inputUpdate, marginBottom, security} = this.props;
    let inputStyle = {...styles.inputBox, ...{borderColor: borderColor, marginBottom: marginBottom}};
    return (
      <TextInput
        style={inputStyle}
        placeholder={placeHolder}
        placeholderTextColor={'gray'}
        onChangeText={(username) => inputUpdate(username)}
        secureTextEntry={security}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    height: DEVICE_HEIGHT * 0.1,
    width: DEVICE_WIDTH * 0.9,
    borderRadius: DEVICE_WIDTH * 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: DEVICE_HEIGHT * 0.03,
    borderWidth: 1,
    fontSize: DEVICE_HEIGHT * 0.025,
    color:'#FFFFFF',
    fontFamily: "LATO-REGULAR"
  },
});
