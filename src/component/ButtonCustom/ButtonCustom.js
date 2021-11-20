import React from 'react';
import fonts, {sizes} from '../../helper/fonts';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import constant from '../../helper/constant';

const ButtonCustomComponent = props => {
  const {btnLogin, titleHeader, imageStyle} = styles;
  const {startGradient, endGradient, textStyle, text} = props;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 0}}
        colors={[
          startGradient || constant.backgroundStartGradient,
          endGradient || constant.backgroundEndGradient,
        ]}
        locations={[0, 1]}
        useAngle={true}
        angle={90}
        angleCenter={{x: 0.5, y: 0.5}}
        style={[btnLogin, props.otherStyle || {}]}>
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
      </LinearGradient>
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
    width: 22,
    height: 22,
    marginRight: 9,
  },
});

export default ButtonCustomComponent;
