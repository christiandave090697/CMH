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

import RecentRequestObject from '../../api/requestsObjects/recentRequestObject';
import {Get} from '../../api/service/service';
import {URL} from '../../constants/apirUrls';

import {test_artist, test_album} from '../../constants/test';

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: [],
      picks: [],
      regulars:[],
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
      releases: test_artist,
      picks: test_artist,
      regulars:test_artist,
      isLoading: false,
    });
  };

  addReleasesData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.releases;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      releases: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
  };

  addPicksData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.picks;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      picks: mergedData,
      isLoading: false,
    });
    // };
    // Get(obj, result);
  };

  addRegularsData = () => {
    this.setState({isLoading: true});
    //api call
    //const obj = new RecentRequestObject();
    // obj.setUrl(URL.LOGIN);
    // const result = (response) => {
    //   console.log("-------------")
    //   console.log(response)
    //   console.log("-------------")
    let currentData = this.state.regulars;
    let incomingData = test_artist;
    let mergedData = currentData.concat(incomingData);
    this.setState({
      regulars: mergedData,
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
    let {isLoading, releases,  picks, regulars} = this.state;
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
