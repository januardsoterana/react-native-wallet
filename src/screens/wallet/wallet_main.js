import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import NavigationCustomComponent from '../../component/Navigation/NavigationCustom';
import {useNavigation} from '@react-navigation/native';
import constant from '../../helper/constant';
import Row from './container/row';
import WalletHeader from './container/wallet_header';
import {connect} from 'react-redux';
import {setShowPopUP, setShowQRPopUP} from '../../modules/account/actions';

const WalletMainScreen = props => {
  const navigation = useNavigation();

  const [data] = useState([{currency: 'BTC'}, {title: 'sdfsdfsf'}]);
  const [dataTransition] = useState([
    {
      ew_tid: '34',
      ew_type: '1',
      ew_watch: '1D1hp4GdTsvtN1w9o73YaWawXG1zix9m1T',
      hash: '4a721ee48b97e2b4aa32ca6701d6c4912a74fb4bdb2298f2b4cc8ed688b47e46',
      inputs: ['1D1hp4GdTsvtN1w9o73YaWawXG1zix9m1T'],
      outputs: ['1KvsHYdwB6f5uNqcKdvGiEqsAR3rBAbA4C'],
      amount: '0.00004681',
      amount_usd: '2.21',
      amount_usd_current: '2.21',
      confirmations: '735',
      fee: '678',
      fee_byte: '4',
      total: '4681',
      dt_network: '2021-09-17 19:39:21',
      dt_added: '2021-09-17 20:39:21',
      web_link:
        'https://blockchair.com/bitcoin/transaction/4a721ee48b97e2b4aa32ca6701d6c4912a74fb4bdb2298f2b4cc8ed688b47e46',
      status_text: 'Pending',
      currency: 'BTC',
      type: 1,
      address_to: '1KvsHYdwB6f5uNqcKdvGiEqsAR3rBAbA4C',
      address_from: '1D1hp4GdTsvtN1w9o73YaWawXG1zix9m1T',
      to_substr: '1KvsHYdwB6f5uN...',
      from_substr: '1D1hp4GdTsvtN1...',
    },
  ]);

  const {container, assetText, headerStyle, messageStyle} = styles;

  const onPressTransition = value => {
    props.setShowPopUP({
      isShow: true,
      data: dataTransition[0],
    });
  };

  const onPressQR = value => {
    props.setShowQRPopUP({
      isShow: true,
      data: {},
    });
  };

  const rednerHeader = () => {
    return (
      <View style={headerStyle}>
        <Text style={assetText}>Asset</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    if (dataTransition.length != 0) {
      return (
        <Row
          onPressCell={onPressTransition}
          data={item}
          indexValue={index}
          isLast={dataTransition.length === index + 1}
        />
      );
    } else {
      return (
        <View style={messageStyle}>
          <Text>No transactions </Text>
        </View>
      );
    }
  };

  const renderHeader = () => {
    const {walletData} = props;
    return (
      <View style={{marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        <NavigationCustomComponent
          title={'Wallet'}
          iconRight={'icon_notification'}
        />
        <WalletHeader walletData={walletData} onPressQR={onPressQR} />
        {rednerHeader()}
        <Row data={data} isLast={true} walletData={walletData} />
        {rednerHeader()}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {rednerHeader()}
        {dataTransition.map((obj, i) => {
          return (
            <Row data={obj} indexValue={i} isLast={data.length === i + 1} />
          );
        })}
      </View>
    );
  };

  return (
    <View style={container}>
      <View style={{flex: 1}}>
        <FlatList
          data={dataTransition}
          extraData={dataTransition}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          // ListFooterComponent={renderFooter}
          keyExtractor={(item, index) => index.toString()}
          styles={{flex: 1}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: constant.screenBackground,
  },
  headerStyle: {
    flexDirection: 'row',
    marginTop: 25,
  },
  assetText: {
    fontSize: sizes.h13,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
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
  messageStyle: {
    alignItems: 'center',
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    userDetails: state.account.userDetails,
    walletData: state.account.walletData,
    transactionsData: state.account.transactionsData,
  };
};

export default connect(mapStateToProps, {
  setShowPopUP,
  setShowQRPopUP,
})(WalletMainScreen);
