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

//redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/account';

//api
import RegisterRequestObject from '../../api/requestsObjects/registerRequestObject';
import {Post} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    username: 'eve.holt@reqres.in',
    password: 'cityslicka',
    retypePassword: 'cityslicka'
  });

  onPressRegister = () => {
    if (!this.isPasswordMatch()){
      alert("Password Mismatch")
      return;
    }
  
    var credentials = this.state;
    const obj = new RegisterRequestObject(credentials);
    obj.setUrl(URL.REGISTER);

    const result = (response) => {
      if (response.error) {
        alert('Registration Failed');
        return;
      }
      alert('Successfully Registered');
    };

    Post(obj, result);
  };

  isPasswordMatch = () => {
    let {password, retypePassword} = this.state
    let match = password === retypePassword ? true : false
    return match;
  }

  username = (input) => {
    console.log(input);
    this.setState({
      username: input,
    });
  };

  password = (input) => {
    console.log(input);
    this.setState({
      password: input,
    });
  };

  retypePassword = (input) => {
    console.log(input);
    this.setState({
      retypePassword: input,
    });
  };

  componentDidMount() {}

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
           <Input
            borderColor={'#FFFFFF'}
            placeHolder={'Verify Password'}
            inputUpdate={this.retypePassword}
            security={true}
            marginBottom={DEVICE_HEIGHT * 0.03}
          />
          <GradientButton
            buttonColor={GRADIENT_COLOR_SET_2}
            buttonText={'Sign Up'}
            buttonTextColor={'#FFFFFF'}
            marginBottom={DEVICE_HEIGHT * 0.01}
            buttonPress={this.onPressRegister}
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

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account,
    isLogin: state.accountReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
