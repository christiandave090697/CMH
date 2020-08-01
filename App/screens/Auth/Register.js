import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {LOGIN_BG, CMH_LOGO_HEIGHT, CMH_LOGO_WIDTH} from '../../constants/constants';
import CMH from '../../assets/svg/CMH_LOGO';

export default class Register extends Component {
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
            // width={CMH_LOGO_WIDTH}
            // height={CMH_LOGO_HEIGHT}
          /> */}
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
  },
});
