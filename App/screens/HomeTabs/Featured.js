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

export default class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
      featured: [],
      extraData: [],
      isLoading: true,
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
      recent: test_artist,
      featured: test_artist,
      isLoading: false,
    });
  };

  addRecentData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.recent;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      recent: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
  };

  addFeaturedData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.featured;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      featured: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
  };

  onPressTile = (data) => {
    console.log(data);
  };

  renderItem = ({item, index}) => {
    item.labelType = 0;
    return <Tile data={item} onPressTile={this.onPressTile} />;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  render() {
    let {isLoading, recent, featured} = this.state;
    return (
      <LinearGradient
        colors={GRADIENT_COLOR_SET_1.COLORS}
        locations={GRADIENT_COLOR_SET_1.LOCATIONS}
        style={styles.mainContainer}>
        <Text style={styles.categoryText}>Recently Played</Text>
        <FlatList
          data={recent}
          extraData={this.state}
          style={styles.flatList}
          horizontal={true}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          onEndReached={() => this.addRecentData()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
        <Text style={styles.categoryText}>Featured Playlist</Text>
        <FlatList
          data={featured}
          extraData={this.state}
          style={styles.flatList}
          horizontal={true}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          onEndReached={() => this.addFeaturedData()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
        <View style={styles.player} />
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
    marginBottom: DEVICE_HEIGHT * 0.03,
  },
  player: {
    backgroundColor: 'transparent',
    height: DEVICE_HEIGHT * 0.15,
  },
});
