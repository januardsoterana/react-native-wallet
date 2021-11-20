import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import fonts, {sizes} from '../../../helper/fonts';
import LinearGradient from 'react-native-linear-gradient';
import constant from '../../../helper/constant';
import {useNavigation} from '@react-navigation/native';
import {walletStack} from '../../../navigation/navigator';

const WalletHeader = props => {
  const navigation = useNavigation();

  const {
    gradientStyle,
    walletText,
    mainText,
    qrText,
    qrImage,
    groupImage,
    imageContainer,
  } = styles;

  const {walletData, onPressQR} = props;

  const onPressQRScan = () => {
    if (onPressQR) {
      onPressQR();
    }
  };

  const walletBalance = () => {
    if (walletData && walletData.wallet && walletData.wallet.wallet_total) {
      return walletData.wallet.wallet_total;
    }
    return '0.0';
  };

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 0}}
      colors={[constant.startHomeGradient, constant.endHomeGradient]}
      locations={[0, 1]}
      useAngle={true}
      angle={90}
      angleCenter={{x: 0.5, y: 0.5}}
      style={gradientStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={walletText}>{'$' + walletBalance()}</Text>
        <View style={{flex: 1}} />
        <View>
          <Image
            source={{uri: 'icon_group'}}
            style={groupImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <Text style={mainText}>Your balance is equivalent</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressQRScan}>
          <View style={imageContainer}>
            <Image
              source={{uri: 'icon_qr'}}
              style={qrImage}
              resizeMode="contain"
            />
            <Text style={qrText}>Receive QR</Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    </LinearGradient>
  );
};

export default WalletHeader;

const styles = StyleSheet.create({
  gradientStyle: {
    marginTop: 26,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 13,
  },
  walletText: {
    fontSize: sizes.h8,
    color: '#FFFFFF',
    fontFamily: fonts.fontRobotoBold,
    lineHeight: 30,
  },
  mainText: {
    fontSize: sizes.h13,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: fonts.fontRobotoRegular,
    marginTop: 5,
    lineHeight: 16,
  },
  qrText: {
    fontSize: sizes.h12,
    color: '#FFFFFF',
    fontFamily: fonts.fontRobotoRegular,
    marginLeft: 11,
  },
  groupImage: {
    width: 25,
    height: 25,
  },
  qrImage: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 49,
    backgroundColor: '#7596EB',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
});
