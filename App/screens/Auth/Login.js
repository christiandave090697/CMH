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
  DEVICE_HEIGHT
} from '../../constants/constants';
import CMH from '../../assets/svg/CMH_LOGO';
import GradientButton from '../../components/GradientButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onPressRegister = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={LOGIN_BG} style={styles.ImageBackground}>
          {/* <CMH
            // width={CHM_LOGO_WIDTH}
            // height={CHM_LOGO_HEIGHT}
          /> */}

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
