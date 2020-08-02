import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {
  LOGIN_BG,
  CHM_LOGO_HEIGHT,
  CHM_LOGO_WIDTH,
  GRADIENT_COLOR_SET_2,
  DEVICE_HEIGHT,
} from '../../constants/constants';
import CMH from '../../assets/svg/CMH_LOGO';
import GradientButton from '../../components/GradientButton';
import Input from '../../components/Input';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    username: null,
    password: null,
  });

  onPressLogin = () => {
    // this.props.navigation.navigate('Register');
    alert('login');
    console.log(this.state)
  };

  username = (input) => {
    console.log(input)
    this.setState({
      username: input
    })
  }
  password = (input) => {
    console.log(input)
    this.setState({
      password: input
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={LOGIN_BG} style={styles.ImageBackground}>
          {/* <CMH
            // width={CHM_LOGO_WIDTH}
            // height={CHM_LOGO_HEIGHT}
          /> */}
          <View style={{marginBottom: DEVICE_HEIGHT * 0.3}}></View>
          <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Email address'}
            inputUpdate={this.username}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Password'}
            inputUpdate={this.password}
            security={true}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <GradientButton
            buttonColor={GRADIENT_COLOR_SET_2}
            buttonText={'Sign In'}
            buttonTextColor={'#FFFFFF'}
            marginBottom={DEVICE_HEIGHT * 0.01}
            buttonPress={this.onPressLogin}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
