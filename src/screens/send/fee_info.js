import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Easing,
} from 'react-native';
import fonts, {lineHeights, sizes} from '../../helper/fonts';
import {connect} from 'react-redux';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';
import constant from '../../helper/constant';

const FeeInfoScreen = props => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.Value(constant.screenHeight * 0.83));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
      Animated.timing(offset, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    }, 50);
  });

  const {
    messageContainer,
    messageText,
    buttonContainer,
    btnStyle,
    textStyle,
    mainText,
    alertOuter,
    headerLine,
  } = styles;

  const onAlertClick = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(offset, {
      toValue: constant.screenHeight * 0.83,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      props.onAlertClick();
    });
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={mainText}>Network Fee</Text>
      </View>
    );
  };
  const renderMessage = () => {
    return (
      <View style={messageContainer}>
        <Text style={messageText}>
          The Bitcoin Network charges a transaction fee whitch varies based on
          blockchain usage. 0% fees are paid to EasyWallet
        </Text>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={[
          buttonContainer,
          {
            bottom:
              props.safeAreaInsetsDefault.bottom + constant.screenHeight * 0.1,
          },
        ]}>
        <ButtonShadowCustom
          otherStyle={btnStyle}
          text={'Got it'}
          textStyle={textStyle}
          onPress={onAlertClick}
        />
      </View>
    );
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <Animated.View style={[styles.alertOuter, {opacity: fadeAnim}]}>
        <TouchableOpacity onPress={onAlertClick} style={{flex: 1}} />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFFFFF',
            paddingBottom: props.safeAreaInsetsDefault.bottom,
            height: constant.screenHeight * 0.83,
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
            zIndex: 22,
          },
          {transform: [{translateY: offset}]},
        ]}>
        <ScrollView>
          <TouchableOpacity onPress={onAlertClick}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 17,
                marginBottom: 19,
              }}>
              <Image
                resizeMode="contain"
                style={headerLine}
                source={{uri: 'icon_popup'}}
              />
            </View>
            {renderTitle()}
          </TouchableOpacity>

          {renderMessage()}
          {renderButton()}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: constant.screenBackground,
  },
  mainText: {
    fontSize: sizes.h16,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h11,
    textAlign: 'center',
  },
  messageContainer: {
    marginTop: 62,
  },
  messageText: {
    fontSize: sizes.h12,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h10,
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 28,
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: 338,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#082330',
    borderRadius: 50,
  },
  textStyle: {
    color: '#537CE5',
  },
  alertOuter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    justifyContent: 'center',
    zIndex: 11,
  },
  headerLine: {
    width: 40,
    height: 4,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(FeeInfoScreen);
