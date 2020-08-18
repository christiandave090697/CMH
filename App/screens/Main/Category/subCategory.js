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

import Tile from '../../../components/Tile';

import LinearGradient from 'react-native-linear-gradient';

//redux
import {connect} from 'react-redux';
import {login} from '../../../redux/actions/account';

import {POST} from '../../../api/service/service';
import {URL} from '../../../constants/apirUrls';

import {test_artist, test_playlist} from '../../../constants/test';
import Settings from '../../../assets/svg/Settings';

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: [],
      popular: [],
      playlist: [],
      releasesPage: 0,
      popularPage: 0,
      playlistPage: 0,
      isLoading: true,
      type: props.route.params.type,
      subType: props.route.params.subType,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    this.setState({
      releases: test_playlist,
      popular: test_playlist,
      playlist: test_playlist,
    });
    // let {user_id, authToken} = this.props.account;
    // let data = {user_id};
    // let url = URL.ALBUMS_ALL;

    // const receiver = (response) => {
    //   console.log('Response:');
    //   console.log(response);

    //   let releases = response.data.new_release.data;
    //   let popular = response.data.our_popular.data;
    //   let playlist = response.data.playlist.data;
    //   this.setState({
    //     releases: releases,
    //     popular: popular,
    //     playlist: playlist,
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

  addReleasesData = () => {
    // this.setState({isLoading: true});
    // let {releasesPage, releases} = this.state;
    // let user_id = this.props.account.user_id;
    // let authToken = this.props.account.authToken;
    // let records = 5;
    // let page = releasesPage + 1;
    // let status = 1;
    // let data = {user_id, records, page, status};
    // let url = URL.ALBUMS_SPECIFIC;
    // const receiver = (response) => {
    //   let currentData = releases;
    //   let incomingData = response.data.data;
    //   let mergedData = currentData.concat(incomingData);
    //   this.setState({
    //     releases: mergedData,
    //     isLoading: false,
    //     releasesPage: page
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

  addpopularData = () => {
    // this.setState({isLoading: true});
    // let {popularPage, popular} = this.state;
    // let user_id = this.props.account.user_id;
    // let authToken = this.props.account.authToken;
    // let records = 5;
    // let page = popularPage + 1;
    // let status = 2;
    // let data = {user_id, records, page, status};
    // let url = URL.ALBUMS_SPECIFIC;
    // const receiver = (response) => {
    //   let currentData = popular;
    //   let incomingData = response.data.data;
    //   let mergedData = currentData.concat(incomingData);
    //   this.setState({
    //     popular: mergedData,
    //     isLoading: false,
    //     popularPage: page
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

  addplaylistData = () => {
    // this.setState({isLoading: true});
    // let {playlistPage, playlist} = this.state;
    // let user_id = this.props.account.user_id;
    // let authToken = this.props.account.authToken;
    // let records = 5;
    // let page = playlistPage + 1;
    // let status = 3;
    // let data = {user_id, records, page, status};
    // let url = URL.ALBUMS_SPECIFIC;
    // const receiver = (response) => {
    //   let currentData = playlist;
    //   let incomingData = response.data.data;
    //   let mergedData = currentData.concat(incomingData);
    //   this.setState({
    //     playlist: mergedData,
    //     isLoading: false,
    //     playlistPage: page
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

  onPressTile = (data) => {
    console.log(data);
  };

  renderItem = ({item, index}) => {
    item.labelType = 1;
    item.artist_name = 'dave butards';
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    let {isLoading, releases, popular, playlist, type, subType} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={()=>this.props.navigation.pop()}>
            <Settings />
          </TouchableOpacity>
          <Text style={styles.headerText}>{type}</Text>
        </View>
        <ScrollView>
          <Text style={styles.categoryText}>Popular This Week</Text>
          <FlatList
            data={popular}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addpopularData()}
            onEndReachedThreshold={0.1}
            decelerationRate={0.5}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
          <Text style={styles.categoryText}>Playlists</Text>
          <FlatList
            data={playlist}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addplaylistData()}
            onEndReachedThreshold={0.1}
            decelerationRate={0.5}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
          <Text style={styles.categoryText}>New Releases</Text>

          <FlatList
            data={releases}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addReleasesData()}
            onEndReachedThreshold={0.1}
            decelerationRate={0.5}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        </ScrollView>
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
  headerText: {
    fontSize: DEVICE_HEIGHT * 0.07,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
    alignSelf: 'center',
  },
  headerView: {
    height: DEVICE_HEIGHT * 0.15,
    marginBottom: DEVICE_HEIGHT * 0.03,
  },
  flatList: {
    marginBottom: DEVICE_HEIGHT * 0.03,
  },
  player: {
    backgroundColor: 'transparent',
    height: DEVICE_HEIGHT * 0.15,
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
