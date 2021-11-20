import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import constant from '../../helper/constant';
import {connect} from 'react-redux';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';

const TransactionsScreen = props => {
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
    amount,
    amount_usd,
    confirmations,
    fee,
    fee_byte,
    dt_network,
    status_text,
    address_from,
  } = props.data;

  const {
    mainText,
    imageView,
    iconStyle,
    imageContainer,
    imageStyle,
    headerText1,
    headerInfo,
    btcText,
    balanceText,
    titleText,
    infoBlock,
    infoContainer,
    btnContainer,
    btnStyle,
    moreText,
    headerLine,
  } = styles;

  const statusText = () => {
    if (status_text) {
      switch (status_text) {
        case 'Confirmed':
          return 'Outgoing Transaction';
        case 'Pending':
          return 'Pending Transaction';
        case 'Received':
          return 'Incoming Transaction';
      }
    }
    return '';
  };

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

  const taskImage = () => {
    if (status_text) {
      switch (status_text) {
        case 'Confirmed':
          return 'icon_send';
        case 'Pending':
          return 'icon_pending';
        case 'Received':
          return 'icon_receive';
      }
    }
    return 'icon_btc';
  };

  const backgroundTask = () => {
    if (status_text) {
      switch (status_text) {
        case 'Confirmed':
          return '#F6543E';
        case 'Pending':
          return '#6374C3';
        case 'Received':
          return '#30E0A1';
      }
    }
    return '#F6543E';
  };
  const imageTintColor = () => {
    if (status_text) {
      switch (status_text) {
        case 'Confirmed':
          return '#F6543E';
        case 'Pending':
          return '#6374C3';
        case 'Received':
          return '#30E0A1';
      }
    }
    return '#F6543E';
  };

  const getAmount = () => {
    if (amount) {
      return `${amount} BTC`;
    }
    return 'aasas';
  };

  const getSubAmount = () => {
    if (amount_usd) {
      return `($ ${amount_usd})`;
    }
    return 'aasas';
  };

  const valueFrom = () => {
    if (address_from) {
      return address_from;
    }
    return 'aasas';
  };

  const getTime = () => {
    if (dt_network) {
      return dt_network;
    }
    return '2021:00:00';
  };

  const getConfirmations = () => {
    if (confirmations) {
      return confirmations;
    }
    return '2021';
  };

  const getFees = () => {
    if (fee) {
      return `${fee} BTC`;
    }
    return '2021';
  };

  const getFeesperbyte = () => {
    if (fee_byte) {
      return `${fee_byte} sats`;
    }
    return '2021';
  };

  const renderTitle = () => {
    return (
      <View>
        <Text style={mainText}>Transaction</Text>
      </View>
    );
  };

  const onMoreDetails = () => {};

  const renderBlock = () => {
    return (
      <View style={imageContainer}>
        <View>
          <View style={[imageView, {backgroundColor: backgroundTask()}]} />
          <View style={iconStyle}>
            <Image
              source={{uri: taskImage()}}
              style={[imageStyle, {tintColor: imageTintColor()}]}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={headerInfo}>
          <Text style={headerText1}>{statusText()}</Text>
          <Text style={btcText}>{getAmount()}</Text>
          <Text style={balanceText}>{getSubAmount()}</Text>
        </View>
      </View>
    );
  };

  const renderInfoBlock = () => {
    return (
      <View style={infoContainer}>
        <View>
          <Text style={titleText}>Sender</Text>
          <Text style={balanceText}>{valueFrom()}</Text>
        </View>

        <View style={infoBlock}>
          <Text style={titleText}>Time (UTC)</Text>
          <Text style={balanceText}>{getTime()}</Text>
        </View>

        <View style={infoBlock}>
          <Text style={titleText}>Confirmations</Text>
          <Text style={balanceText}>{getConfirmations()}</Text>
        </View>

        <View style={infoBlock}>
          <Text style={titleText}>Network fee</Text>
          <Text style={balanceText}>{getFees()}</Text>
        </View>

        <View style={infoBlock}>
          <Text style={titleText}>Network fee per byte</Text>
          <Text style={balanceText}>{getFeesperbyte()}</Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={btnContainer}>
        <ButtonShadowCustom
          otherStyle={btnStyle}
          text={'More details'}
          textStyle={moreText}
          onPress={onMoreDetails}
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
          {renderBlock()}
          {renderInfoBlock()}
          {renderButton()}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerInfo: {
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 46,
    marginTop: 83,
  },
  imageView: {
    backgroundColor: '#30E0A1',
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
  headerText1: {
    fontSize: sizes.h12,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: 21,
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
    lineHeight: 21,
  },
  titleText: {
    fontSize: sizes.h14,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: 16,
  },
  infoBlock: {
    marginTop: 15,
  },
  btnContainer: {
    marginTop: 44,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 73,
  },
  infoContainer: {
    marginTop: 35,
    marginHorizontal: 47,
  },
  moreText: {
    color: '#537CE5',
  },
  btnStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#082330',
    borderRadius: 50,
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

export default connect(mapStateToProps, {})(TransactionsScreen);
