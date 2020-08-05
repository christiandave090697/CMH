import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import Like from '../assets/svg/like.svg';

export default class Tile2 extends Component {
  renderTileImageStyle = (type) => {
    switch (type) {
      case 'artist':
        return styles.artistTile;
      case 'album':
        return styles.albumTile;
      case 'playlist':
        return styles.playlistTile;

      default:
        return;
    }
  };

  renderTileLabelStyle = (type, data) => {
    let label = data.label;
    let favorites = data.favorites;
    switch (type) {
      case 0:
        return <Text style={styles.label_0}>{label}</Text>;
      case 1:
        return (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.label_1}>{label}</Text>
            <View style={{flexDirection: 'row'}}>
              <Like />
              <Text style={styles.favorites}>{favorites}</Text>
            </View>
          </View>
        );
      default:
        return;
    }
  };

  render() {
    let {data, onPressTile} = this.props;
    let tileImageType = data.type;
    let tileLabelType = data.labelType;

    let tileImageStyle = this.renderTileImageStyle(tileImageType);
    let tileLabelStyle = this.renderTileLabelStyle(tileLabelType, data);
    return (
      <TouchableOpacity
        style={styles.mainTile}
        onPress={() => onPressTile(data)}>
        <View style={tileImageStyle}></View>
        {tileLabelStyle}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  //tile
  mainTile: {
    height: DEVICE_HEIGHT * 0.28,
    width: DEVICE_WIDTH * 0.45,
    paddingLeft: DEVICE_WIDTH * 0.03,
    marginBottom: DEVICE_HEIGHT * 0.02,
  },
  artistTile: {
    height: DEVICE_HEIGHT * 0.23,
    width: DEVICE_WIDTH * 0.42,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  albumTile: {
    height: DEVICE_HEIGHT * 0.23,
    width: DEVICE_WIDTH * 0.42,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  playlistTile: {
    height: DEVICE_HEIGHT * 0.23,
    width: DEVICE_WIDTH * 0.42,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
  },

  //label
  label_0: {
    fontSize: DEVICE_HEIGHT * 0.02,
    fontFamily: 'LATO-REGULAR',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: DEVICE_HEIGHT * 0.01,
  },
  label_1: {
    fontSize: DEVICE_HEIGHT * 0.02,
    fontFamily: 'LATO-REGULAR',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: DEVICE_HEIGHT * 0.01,
  },
  favorites: {
    fontSize: DEVICE_HEIGHT * 0.015,
    fontFamily: 'LATO-REGULAR',
    color: '#FFFFFF',
    textAlign: 'left',
  },

  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: DEVICE_WIDTH * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
