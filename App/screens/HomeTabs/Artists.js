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

import {Get} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {test_artist, test_album} from '../../constants/test';

export default class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      like: [],
      extraData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    // };
    // Get(obj, result);

    this.setState({
      upcoming: test_artist,
      like: test_artist,
      isLoading: false,
    });
  };

  addUpcomingData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.upcoming;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      upcoming: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
  };

  addLikeData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.like;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      like: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
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
    let {isLoading, upcoming, like} = this.state;
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
            // refreshing={refreshing}
            // onRefresh={onRefresh}
          />
          <Text style={styles.categoryText}>Artists You Might Like</Text>
          <FlatList
            data={like}
            extraData={this.state}
            style={styles.flatList}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={() => this.addLikeData()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter.bind(this)}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
          />

          {/* <FlatList
            data={recent}
            extraData={this.state}
            numColumns={3}
            scrollEnabled={false}
            style={styles.flatList}
            renderItem={this.renderItem2}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            onEndReached={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter.bind(this)}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
          /> */}
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
