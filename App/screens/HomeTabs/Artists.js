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
      extraData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let data = {user_id};
    let url = URL.ARTISTS_ALL;

    const receiver = (response) => {
      console.log('Response:');
      console.log(response);

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
    this.setState({isLoading: true});
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let data = {user_id, records};
    let url = URL.ARTISTS_SPECIFIC;

    const receiver = (response) => {
      console.log('Response:');
      console.log(response);

      let currentData = this.state.upcoming;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        upcoming: mergedData,
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
    this.setState({isLoading: true});
    let user_id = this.props.account.user_id;
    let authToken = this.props.account.authToken;
    let records = 5;
    let data = {user_id, records};
    let url = URL.ARTISTS_SPECIFIC;

    const receiver = (response) => {
      console.log('Response:');
      console.log(response);

      let currentData = this.state.suggested;
      let incomingData = response.data.data;
      let mergedData = currentData.concat(incomingData);
      this.setState({
        suggested: mergedData,
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
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderItem2 = ({item, index}) => {
    item.labelType = 0;
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
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
