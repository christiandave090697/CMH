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

import {Get} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {test_playlist} from '../../constants/test';

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
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
      playlist: test_playlist,
      isLoading: false,
    });
  };



  addPlaylistData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.playlist;
    let incomingData = test_playlist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      playlist: mergedData,
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
