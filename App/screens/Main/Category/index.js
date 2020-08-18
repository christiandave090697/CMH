import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  GRADIENT_COLOR_SET_1,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../../../constants/constants';

import Tile3 from '../../../components/Tile@3';
import AlbumTile from '../../../components/AlbumTile';

import LinearGradient from 'react-native-linear-gradient';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

import {POST} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

import {test_genre} from '../../../constants/test';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: [],
      moods: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    this.setState({
      genre: test_genre,
      moods: test_genre,
      isLoading: false,
    });
    // let {user_id, authToken} = this.props.account
    // let data = {user_id};
    // let url = URL.ARTISTS_ALL;

    // const receiver = (response) => {
    //   let suggested = response.data.suggested.data
    //   let upcoming = response.data.upcoming.data
    //   this.setState({
    //     upcoming: upcoming,
    //     suggested: suggested,
    //     isLoading: false,
    //   });
    // };

    // let payload = {
    //   data,
    //   url,
    //   receiver,
    //   authToken,
    // };
    // POST(payload);
  };

  onPressTile = (subType, type) => {
    let {push} = this.props.navigation
    push('SubCategory', {subType, type });
  };

  renderList = (data, type) => {
    const genreList = data.map((item, key) => {
      return <Tile3 subType={item} type={type} onPressTile={this.onPressTile} key={key} />;
    });

    return genreList;
  };

  render() {
    let {genre, moods} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <Text style={styles.headerText}>Categories</Text>
        <ScrollView>
          <Text style={styles.subHeaderText}>Genres</Text>
          <View style={styles.list}>{this.renderList(genre, 'Genre')}</View>
          <Text style={styles.subHeaderText}>Moods</Text>
          <View style={styles.list}>{this.renderList(moods, 'Moods')}</View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: DEVICE_WIDTH * 0.01,
    paddingTop: DEVICE_HEIGHT * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: DEVICE_HEIGHT * 0.03,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
  },
  subHeaderText: {
    fontSize: DEVICE_HEIGHT * 0.025,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
    alignSelf: 'center',
    marginTop: DEVICE_HEIGHT * 0.05,
    marginBottom: DEVICE_HEIGHT * 0.03,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  flatList: {
    marginBottom: DEVICE_HEIGHT * 0.05,
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
    login: (payload) => dispatch(login(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
