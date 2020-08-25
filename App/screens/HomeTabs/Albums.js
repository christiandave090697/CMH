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

import Tile from '../../components/Tile';
import AlbumTile from '../../components/AlbumTile';

import LinearGradient from 'react-native-linear-gradient';

//redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/account';

import {POST} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {test_artist, test_album} from '../../constants/test';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: [],
      picks: [],
      regulars: [],
      releasesPage: 0,
      picksPage: 0,
      regularsPage: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    let {user_id, authToken} = this.props.account;
    let data = {user_id};
    let url = URL.ALBUMS_ALL;

    const receiver = (response) => {

      let releases = response.data.new_release.data;
      let picks = response.data.our_picks.data;
      let regulars = response.data.regulars.data;
      this.setState({
        releases: releases,
        picks: picks,
        regulars: regulars,
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

  addReleasesData = () => {
    this.setState({isLoading: true});
    let {releasesPage, releases} = this.state;
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = releasesPage + 1;
    let status = 1;
    let data = {user_id, records, page, status};
    let url = URL.ALBUMS_SPECIFIC;

    const receiver = (response) => {
      let currentData = releases;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        releases: mergedData,
        isLoading: false,
        releasesPage: page
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

  addPicksData = () => {
    this.setState({isLoading: true});
    let {picksPage, picks} = this.state;
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = picksPage + 1;
    let status = 2;
    let data = {user_id, records, page, status};
    let url = URL.ALBUMS_SPECIFIC;

    const receiver = (response) => {
      let currentData = picks;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        picks: mergedData,
        isLoading: false,
        picksPage: page
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

  addRegularsData = () => {
    this.setState({isLoading: true});
    let {regularsPage, regulars} = this.state;
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = regularsPage + 1;
    let status = 3;
    let data = {user_id, records, page, status};
    let url = URL.ALBUMS_SPECIFIC;

    const receiver = (response) => {
      let currentData = regulars;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        regulars: mergedData,
        isLoading: false,
        regularsPage: page
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
  };

  renderItem = ({item, index}) => {
    item.labelType = 2;
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    let {isLoading, releases, picks, regulars} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <ScrollView>
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
          <Text style={styles.categoryText}>Our Picks For You</Text>
          <FlatList
            data={picks}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addPicksData()}
            onEndReachedThreshold={0.1}
            decelerationRate={0.5} 
            ListFooterComponent={this.renderFooter.bind(this)}
          />
          <Text style={styles.categoryText}>Your Regulars</Text>
          <FlatList
            data={regulars}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addRegularsData()}
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
    flex:1
  },
  categoryText: {
    fontSize: DEVICE_HEIGHT * 0.03,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
    marginLeft: DEVICE_WIDTH * 0.03,
    marginBottom: DEVICE_HEIGHT * 0.02,
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

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
