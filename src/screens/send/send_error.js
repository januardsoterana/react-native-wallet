import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts, {lineHeights, sizes} from '../../helper/fonts';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationCustomComponent from '../../component/Navigation/NavigationCustom';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';
import {setShowInfoPopUP} from '../../modules/account/actions';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import constant from '../../helper/constant';

const SendErrorScreen = props => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const {walletData} = props;
  const {wallet} = walletData;

  const {
    container,
    imageContainer,
    imageView,
    iconStyle,
    imageStyle,
    headerInfo,
    headerText1,
    btcText,
    balanceText,
    buttonContainer,
    grayLabel,
    infoButton,
    buttonSubContainer,
    valueContainer,
    infoMainContainer,
    infoSubContainer,
    btnStyle,
    btnText,
    messageText,
  } = styles;

  const onPressInfo = value => {
    props.setShowInfoPopUP({
      isShow: true,
      data: {},
    });
  };

  const onPressAgain = () => {
    navigation.goBack();
  };

  const BTCPRice = () => {
    if (walletData && wallet && wallet.btc_price) {
      return '+' + wallet.btc_price + 'BTC';
    }
    return '0.000 BTC';
  };

  const WalletTotal = () => {
    if (walletData && wallet && wallet.wallet_total) {
      return '($' + wallet.wallet_total + ')';
    }
    return '($ 0000)';
  };

  const errorMsg = () => {
    if (params && params.error_msg) {
      return params.error_msg;
    }
    return 'Outgoing Transaction Error 401';
  };

  const renderBlock = () => {
    return (
      <View style={imageContainer}>
        <View>
          <View style={imageView} />
          <View style={iconStyle}>
            <Image
              source={{uri: 'icon_send'}}
              style={[imageStyle, {tintColor: '#F6543E'}]}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={headerInfo}>
          <Text style={headerText1}>Outgoing Transaction</Text>
          <Text style={btcText}>{BTCPRice()}</Text>
          <Text style={balanceText}>{WalletTotal()}</Text>
        </View>
      </View>
    );
  };

  const renderSuccessMessage = () => {
    return (
      <View style={imageContainer}>
        <View>
          <View style={imageView} />
          <View style={iconStyle}>
            <Image
              source={{uri: 'icon_error'}}
              style={[imageStyle, {tintColor: '#F6543E'}]}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={headerInfo}>
          <Text style={messageText}>{errorMsg()}</Text>
        </View>
      </View>
    );
  };

  const renderValue = () => {
    return (
      <View style={valueContainer}>
        <View>
          <Text style={grayLabel}>From</Text>
          <Text style={balanceText}>{params.from_to}</Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={grayLabel}>To</Text>
          <Text style={balanceText}>{params.send_to}</Text>
        </View>
      </View>
    );
  };

  const renderNetworkInfo = () => {
    return (
      <View style={infoMainContainer}>
        <View style={infoSubContainer}>
          <Text style={grayLabel}>Network fee</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity onPress={onPressInfo}>
            <Text style={infoButton}>Info</Text>
          </TouchableOpacity>
        </View>

        <View style={buttonSubContainer}>

          <ButtonShadowCustom
            otherStyle={btnStyle}
            text={params.networkFee}
            textStyle={btnText}
          />
        </View>

        <View style={{marginTop: 15}}>
          <Text style={grayLabel}>Total</Text>
          <Text style={balanceText}>{`${wallet.wallet_total} BTC`}</Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={buttonContainer}>
        <ButtonCustom onPress={onPressAgain} text={'Try again'} />
      </View>
    );
  };

  return (
    <ScrollView style={container}>
      <View style={{marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        <View style={{marginHorizontal: 28}}>
          <NavigationCustomComponent title={'Send Error'} />
        </View>
        {renderBlock()}
        {renderSuccessMessage()}
        {renderValue()}
        {renderNetworkInfo()}
        {renderButton()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.screenBackground,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginTop: 26,
  },
  imageView: {
    backgroundColor: '#F6543E',
    borderRadius: 14,
    height: 77,
    width: 77,
    opacity: 0.1,
  },
  iconStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 27.5,
    height: 26.13,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerText1: {
    fontSize: sizes.h12,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h10,
  },
  btcText: {
    fontSize: sizes.h18,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
  },
  balanceText: {
    fontSize: sizes.h12,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    lineHeight: lineHeights.h10,
  },
  labelText: {
    fontSize: sizes.h15,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h7,
  },
  labelAmount: {
    fontSize: sizes.h15,
    color: '#537CE5',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h7,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  valueContainer: {
    marginTop: 18,
    marginHorizontal: 28,
  },
  grayLabel: {
    fontSize: sizes.h14,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h8,
  },
  infoButton: {
    fontSize: sizes.h14,
    color: '#537CE5',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h8,
    marginRight: 28,
  },
  buttonSubContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  btnStyle: {
    height: 27,
    backgroundColor: '#7596EB',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  btnText: {
    fontSize: sizes.h14,
    color: '#FFFFFF',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h9,
    textAlign: 'center',
  },
  messageText: {
    fontSize: sizes.h10,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h12,
    marginRight: 5,
  },
  infoMainContainer: {
    marginLeft: 28,
    marginTop: 15,
  },
  infoSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    walletData: state.account.walletData,
  };
};

export default connect(mapStateToProps, {setShowInfoPopUP})(SendErrorScreen);
