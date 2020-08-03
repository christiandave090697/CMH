import React, {Component} from 'react';

import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';

import {GRADIENT_COLOR_SET_1} from '../../constants/constants';

import LinearGradient from 'react-native-linear-gradient';

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onPressLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <Text>Featured</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
