import React, {useState, useEffect} from 'react';
import {TextInput, View, StyleSheet, Text, Image} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';

const NavigationCustomComponent = props => {
  const {mainTextContainer, mainText, image, fullContainer} = styles;
  const {title, iconRight} = props;

  return (
    <View>
      <View style={mainTextContainer}>
        <Text style={mainText}>{title}</Text>
        <View style={fullContainer} />
        {iconRight && (
          <Image source={{uri: iconRight}} style={image} resizeMode="contain" />
        )}
      </View>
    </View>
  );
};
export default NavigationCustomComponent;

const styles = StyleSheet.create({
  mainTextContainer: {
    flexDirection: 'row',
  },
  mainText: {
    fontSize: sizes.h5,
    color: '#17171A',
    fontFamily: fonts.fontRobotoBold,
  },
  image: {
    height: 40,
    width: 40,
  },
  fullContainer: {flex: 1},
});
