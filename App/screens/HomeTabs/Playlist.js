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
} from '../../constants/constants';

import Tile2 from '../../components/Tile@2';
import AlbumTile from '../../components/AlbumTile';

import LinearGradient from 'react-native-linear-gradient';

//redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/account';

import {POST} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {test_playlist} from '../../constants/test';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      playlistPage: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    let {user_id, authToken} = this.props.account;
    let data = {user_id};
    let url = URL.PLAYLIST_ALL;

    const receiver = (response) => {
      console.log('Response:');
      console.log(response);

      let playlist = response.data.data;
      this.setState({
        playlist: playlist
      });
    };

    let payload = {
      data,
      url,
      receiver,
      authToken,
    };
    POST(payload);
  };


  addPlaylistData = () => {
    this.setState({isLoading: true});
    let {playlistPage, playlist} = this.state;
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = playlistPage + 1;
    let data = {user_id, records, page};
    let url = URL.PLAYLIST_ALL;

    const receiver = (response) => {
      console.log("======xxx=")
      console.log(response.data.data)
      console.log("======xxx=")

      let currentData = playlist;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        playlist: mergedData,
        playlistPage: page,
        isLoading: false,
      });
    };

    let payload = {
      data,
      url,
      receiver,
      authToken,
    };
    POST(payload);
  };

  onPressTile = (data) => {
    console.log(data);
  };

  renderItem = ({item, index}) => {
    item.labelType = 1;
    item.type = 'playlist'
    return <Tile2 data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    let {isLoading, playlist} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
          <FlatList
            data={playlist}
            extraData={this.state}
            numColumns={2}
            style={styles.flatList}
            // horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addPlaylistData()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter.bind(this)}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
          />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: DEVICE_WIDTH * 0.01,
    paddingTop: DEVICE_HEIGHT * 0.03,
    flex: 1,
  },
  categoryText: {
    fontSize: DEVICE_HEIGHT * 0.03,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
    marginLeft: DEVICE_WIDTH * 0.03,
    marginBottom: DEVICE_HEIGHT * 0.02,
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

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);