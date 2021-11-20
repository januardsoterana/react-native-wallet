import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import fonts, {sizes} from '../../../helper/fonts';

const Row = props => {
  const {
    qrImage,
    assetSubText1,
    assetSubText2,
    underLineStyle,
    iconStyle,
    imageView,
    imageContainer,
    fullContainer,
    viewSubContainer,
    alignItemHorizontal,
    flexDirectionRow,
  } = styles;
  const {data, isLast, walletData, indexValue} = props;
  const {title, currency, status_text, from_substr, amount} = data;

  const onPressCell = () => {
    if (props.onPressCell) {
      props.onPressCell(indexValue || 0);
    }
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

  const statusText = () => {
    if (status_text) {
      switch (status_text) {
        case 'Confirmed':
          return 'Send';
        case 'Pending':
          return 'Pending';
        case 'Received':
          return 'Received';
      }
    }
    return 'BTC';
  };

  const valueFrom = () => {
    if (status_text) {
      return `From: ${from_substr}`;
    }
    if (walletData && walletData.wallet && walletData.wallet.btc_price) {
      return '$' + walletData.wallet.btc_price;
    }
    return '22222';
  };

  const valueAmount = () => {
    if (status_text) {
      return `${amount} BTC`;
    }
    if (walletData && walletData.wallet && walletData.wallet.wallet_total) {
      return '$' + walletData.wallet.wallet_total;
    }

    return '0.0';
  };

  const valueSubAmount = () => {
    if (status_text) {
      return '';
    }
    if (walletData && walletData.address && walletData.address.balance) {
      return walletData.address.balance;
    }

    return '0.0';
  };

  return (
    <TouchableOpacity onPress={onPressCell} style={viewSubContainer}>
      <View style={imageContainer}>
        <View>
          <View style={[imageView, {backgroundColor: backgroundTask()}]} />
          <View style={iconStyle}>
            <Image
              source={{uri: taskImage()}}
              style={[qrImage, {tintColor: imageTintColor()}]}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={alignItemHorizontal}>
          <Text style={assetSubText1}>{statusText()}</Text>
          <Text style={assetSubText2}>{valueFrom()}</Text>
        </View>
        <View style={fullContainer} />
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}} />
            <Text style={assetSubText1}>{valueAmount()} </Text>
          </View>
          {!status_text && (
            <View style={flexDirectionRow}>
              <View style={fullContainer} />
              <Text style={assetSubText2}>{valueSubAmount()}</Text>
            </View>
          )}
        </View>
      </View>
      {!isLast && <View style={underLineStyle} />}
    </TouchableOpacity>
  );
};

export default Row;

const styles = StyleSheet.create({
  qrText: {
    fontSize: sizes.h12,
    color: '#FFFFFF',
    fontFamily: fonts.fontRobotoRegular,
    marginLeft: 11,
  },
  viewSubContainer: {marginTop: 16},
  alignItemHorizontal: {marginHorizontal: 12},
  fullContainer: {flex: 1},
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexDirectionRow: {flexDirection: 'row'},
  groupImage: {
    width: 25,
    height: 25,
  },
  qrImage: {
    width: 25,
    height: 25,
  },
  assetSubText1: {
    fontSize: sizes.h12,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    lineHeight: 21,
  },
  assetSubText2: {
    fontSize: sizes.h14,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: 16,
    marginTop: 1,
  },
  imageView: {
    backgroundColor: '#F6543E',
    borderRadius: 20,
    height: 56,
    width: 56,
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
  underLineStyle: {
    height: 1,
    backgroundColor: '#B9C1D9',
    marginTop: 16,
    opacity: 0.7,
  },
});
