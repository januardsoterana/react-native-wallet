import React from 'react';
import fonts, {sizes} from '../../helper/fonts';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';

const ButtonShadowCustom = props => {
  const {btnLogin, titleHeader, imageStyle, shadowStyle} = styles;
  const {textStyle, text} = props;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[btnLogin, props.otherStyle || {}, shadowStyle]}>
        {props.image && (
          <Image
            resizeMode="contain"
            style={[imageStyle, props.imageOtherStyles]}
            source={{uri: props.image}}
          />
        )}
        {(props.isLoading && <ActivityIndicator color={'#FFF'} />) || (
          <Text style={[titleHeader, textStyle || {}]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    height: 49,
    borderRadius: 24.5,
    backgroundColor: '#2D8EE7',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  titleHeader: {
    fontFamily: fonts.fontRobotoBold,
    fontSize: sizes.h11,
    color: '#FFFFFF',
  },
  imageStyle: {
    width: 20,
    height: 22,
    marginRight: 12,
  },
  shadowStyle: {
    shadowColor: '#082330',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ButtonShadowCustom;
