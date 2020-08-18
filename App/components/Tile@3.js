import React, {Component} from 'react';

import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/constants';
import Like from '../assets/svg/like.svg';

export default class Tile3 extends Component {
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
    // let label = data.label;
    let label = data.title;

    let favorites = data.favorites;
    switch (type) {
      case 0:
        return <Text style={styles.label_0}>{label}</Text>;
      case 1:
        return (
          <View style={{alignItems: 'center'}}>
            <Text numberOfLines={1} style={styles.label_1}>
              {label}
            </Text>
            <View style={styles.row}>
              <Like
                width={DEVICE_WIDTH * 0.02}
                height={DEVICE_HEIGHT * 0.02}
                style={{marginRight: DEVICE_WIDTH * 0.02}}
              />
              <Text style={styles.favorites}>{favorites}</Text>
            </View>
          </View>
        );
      default:
        return;
    }
  };

  render() {
    let {subType, type, onPressTile} = this.props;
    return (
      <TouchableOpacity
        style={styles.mainTile}
        onPress={() => onPressTile(subType, type)}>
        <Image
          source={{
            uri:
              'https://i.pinimg.com/236x/ec/56/ca/ec56ca390e5ec94b35f48729be88c266.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.label}>{subType}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  //tile
  mainTile: {
    height: DEVICE_HEIGHT * 0.15,
    width: DEVICE_WIDTH * 0.42,
    backgroundColor: 'black',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
    marginBottom: DEVICE_HEIGHT * 0.02,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    height: DEVICE_HEIGHT * 0.15,
    width: DEVICE_WIDTH * 0.42,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
  },
  label: {
    fontSize: DEVICE_HEIGHT * 0.02,
    color: '#FFFFFF',
    fontFamily: 'LATO-BOLD',
    position: 'absolute',
  },
  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: DEVICE_WIDTH * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
