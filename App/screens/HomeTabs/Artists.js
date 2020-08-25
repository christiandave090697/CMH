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

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      suggested: [],
      upcomingPage: 0,
      suggestedPage: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    let {user_id, authToken} = this.props.account
    let data = {user_id};
    let url = URL.ARTISTS_ALL;

    const receiver = (response) => {
      let suggested = response.data.suggested.data
      let upcoming = response.data.upcoming.data
      this.setState({
        upcoming: upcoming,
        suggested: suggested,
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

  addUpcomingData = () => {
    this.setState({isLoading:true})
    let {upcomingPage, upcoming} = this.state
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = upcomingPage + 1
    let status = 2;
    let data = {user_id, records, page, status};
    let url = URL.ARTISTS_SPECIFIC;

    const receiver = (response) => {
      let currentData = upcoming;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        upcoming: mergedData,
        upcomingPage: page,
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

  addSuggestedData = () => {
    this.setState({isLoading:true})
    let {suggestedPage, suggested} = this.state
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let page = suggestedPage + 1
    let status = 2;
    let data = {user_id, records, page, status};
    let url = URL.ARTISTS_SPECIFIC;

    const receiver = (response) => {
      let currentData = suggested;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        suggested: mergedData,
        isLoading: false,
        suggestedPage: page
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
    item.labelType = 1;
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderItem2 = ({item, index}) => {
    item.labelType = 0;
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    let {isLoading, upcoming, suggested} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <ScrollView>
          <Text style={styles.categoryText}>Upcoming Artists</Text>
          <FlatList
            data={upcoming}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addUpcomingData()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter.bind(this)}
            decelerationRate={0.5} 
          />
          <Text style={styles.categoryText}>Artists You Might Like</Text>
          <FlatList
            data={suggested}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addSuggestedData()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter.bind(this)}
            decelerationRate={0.5} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
