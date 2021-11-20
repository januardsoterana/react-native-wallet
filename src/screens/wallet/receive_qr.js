import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import constant from '../../helper/constant';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';
import Share from 'react-native-share';

const ReceiveQRScreen = props => {
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

  const {walletData} = props;
  const QRLink = walletData.address.address;
  console.log(walletData);

  const {
    mainText,
    btnContainer,
    btnStyle,
    textStyle,
    qrLinkStyle,
    qrCodeContainer,
    qrLinkContainer,
    shareBtnStyle,
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

  const onCopyLink = () => {
    Clipboard.setString(QRLink);
  };

  const onShare = async () => {
    const shareOptions = {
      url: QRLink,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={mainText}>Receive QR</Text>
      </View>
    );
  };

  const renderQRCode = () => {
    let base64Logo = `data:image/png;base64,${QRLink}`;
    return (
      <View style={qrCodeContainer}>
        <QRCode
          value={QRLink}
          size={200}
          logo={{uri: base64Logo}}
          logoSize={30}
          logoBackgroundColor="transparent"
        />
        <View style={qrLinkContainer}>
          <Text
            adjustsFontSizeToFit={true}
            minimumFontScale={0.3}
            numberOfLines={1}
            style={qrLinkStyle}>
            {QRLink}
          </Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={btnContainer}>
        <View>
          <ButtonShadowCustom
            image={'copy'}
            otherStyle={btnStyle}
            text={'Copy'}
            textStyle={textStyle}
            onPress={onCopyLink}
          />
        </View>

        <View style={shareBtnStyle}>
          <ButtonShadowCustom
            image={'icon_share'}
            otherStyle={btnStyle}
            text={'Share'}
            textStyle={textStyle}
            onPress={onShare}
          />
        </View>
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
        {renderQRCode()}
        {renderButton()}
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
  mainText: {
    fontSize: sizes.h16,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: 22,
    textAlign: 'center',
  },
  imageStyle: {
    width: 27.5,
    height: 26.13,
  },
  headerLine: {
    width: 40,
    height: 4,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 60,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrLinkContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
  qrCodeContainer: {
    marginTop: 87,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#537CE5',
  },
  btnStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#082330',
    borderRadius: 50,
  },
  qrLinkStyle: {
    fontSize: sizes.h10,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    lineHeight: 21,
    alignItems: 'center',
  },
  shareBtnStyle: {
    marginHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    walletData: state.account.walletData,
  };
};

export default connect(mapStateToProps, {})(ReceiveQRScreen);
