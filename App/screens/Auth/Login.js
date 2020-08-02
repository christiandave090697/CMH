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
import LoginRequestObject from '../../api/requestsObjects/loginRequestObject';
import {Post} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    username: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });

  onPressLogin = () => {
    // // this.props.navigation.navigate('Register');
    // alert('login');
    // // console.log(this.state)
    // this.props.login(this.state)
    // console.log('new data')
    // console.log(this.props.account)
    // this.props.navigation.navigate('Register');

    var credentials = this.state;
    const obj = new LoginRequestObject(credentials);
    obj.setUrl(URL.LOGIN);

    const result = (response) => {
      if (response.error) {
        alert('Invalid Credentials');
        return;
      }
      console.log('Response:');
      console.log(response);
      let authToken = response.token;
      let data = {...this.state, ...{authToken}};
      this.props.login(data);
      alert('Successful Login');
    };

    Post(obj, result);
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
