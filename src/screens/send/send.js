import React, {useEffect, useState} from 'react';
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
import NavigationCustomComponent from '../../component/Navigation/NavigationCustom';
import TextInputCustom from '../../component/TextInputCustom/TextInputCustom';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';
import {useNavigation} from '@react-navigation/native';
import {sendStack} from '../../navigation/navigator';
import constant from '../../helper/constant';
import {
  setShowInfoPopUP,
  sendTransactions,
  getFee,
  validateAddress,
} from '../../modules/account/actions';

const SendMainScreen = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setPressSlow(true);
    setNetworkFee('');
  }, []);

  const {
    container,
    imageContainer,
    imageView,
    iconStyle,
    imageStyle,
    headerInfo,
    headerText1,
    balanceText,
    textInputMainContainer,
    buttonContainer,
    grayLabel,
    infoButton,
    buttonSubContainer,
    infoSubContainer,
    addressContainer,
    infoMainContainer,
    infoButtonContainer,
    errorButton,
    feeContainer,
    btnStyle,
    btnText,
  } = styles;

  const {walletData, userDetails} = props;
  const {wallet} = walletData;
  const {address} = userDetails;

  const [addressSend, setAddressSend] = useState({value: '', error: ''});
  const [btcAmount, setBtcAmount] = useState({value: '', error: ''});
  const [networkFee, setNetworkFee] = useState({value: '', error: ''});

  const [feeTotal, setFeeTotal] = useState(0);
  const [feeTime, setFeeTime] = useState(0);
  const [feeByte, setFeeByte] = useState(0);

  const [isError, isSetError] = useState(false);
  const [PressSlow, setPressSlow] = useState(false);
  const [PressAverage, setPresAverage] = useState(false);
  const [PressFastest, setPressFastest] = useState(false);

  const countTotalFund = () => {
    if (wallet.wallet_total && btcAmount.value) {
      if (parseInt(wallet.wallet_total) > parseInt(btcAmount.value)) {
        return `${parseInt(wallet.wallet_total) - btcAmount.value} BTC`;
      } else {
        return 'Insufficient Fund..';
      }
    }
    return wallet.wallet_total;
  };

  const onPressSlow = () => {
    setPressSlow(true);
    setPresAverage(false);
    setPressFastest(false);
    const speed = 1;

    props
      .getFee(speed)
      .then(res => {
        setFeeTotal(res.result.fee_total);
        setFeeTime(res.result.fee_time);
        setFeeByte(res.result.fee_byte);
        setNetworkFee('Slow');
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const onPressAverage = () => {
    setPresAverage(true);
    setPressSlow(false);
    setPressFastest(false);
    const speed = 3;

    props
      .getFee(speed)
      .then(res => {
        setFeeTotal(res.result.fee_total);
        setFeeTime(res.result.fee_time);
        setFeeByte(res.result.fee_byte);
        setNetworkFee('Average');
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const onPressFastest = () => {
    setPressFastest(true);
    setPressSlow(false);
    setPresAverage(false);
    const speed = 5;
    props
      .getFee(speed)
      .then(res => {
        setFeeTotal(res.result.fee_total);
        setFeeTime(res.result.fee_time);
        setFeeByte(res.result.fee_byte);
        setNetworkFee('Fastest');
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const onPressInfo = value => {
    props.setShowInfoPopUP({
      isShow: true,
      data: {},
    });
  };

  const ValidateSendAddress = () => {
    props
      .validateAddress(addressSend.value)
      .then(res => {
        switch (res.result.result) {
          case 0:
            isSetError(true);
            const timeId = setTimeout(() => {
              isSetError(false);
              setAddressSend('');
            }, 10000);

            return () => {
              clearTimeout(timeId);
            };
          case 1:
            // callAPIForPay();
          default:
            break;
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const callAPIForPay = () => {
    if (addressSend.value === '') {
      alert('Please Enter Send Address');
    } else if (btcAmount.value === '') {
      alert('Please Enter Amount');
    } else if (networkFee === '') {
      alert('Please Select Fee Type.');
    } else if (countTotalFund() === 'Insufficient Fund..') {
      alert('Insufficient Fund..');
    } else {
      const uid = userDetails.uid;
      const sender_address = addressSend.value;
      const fee = feeByte;
      const amount = btcAmount.value;
      const total = countTotalFund();

      props
        .sendTransactions(uid, sender_address, fee, amount)
        .then(res => {
          console.log(res.result);
          if (res.result.error) {
            const error_msg = res.result.error.text;
            navigation.navigate(sendStack.send_error, {
              error_msg: error_msg,
              send_to: sender_address,
              from_to: address.address,
              networkFee: networkFee,
            });
            setBtcAmount('');
            setAddressSend('');
            setPressFastest(false);
            setPressSlow(false);
            setPresAverage(false);
          } else {
            navigation.navigate(sendStack.send_success, {
              send_to: sender_address,
              from_to: address.address,
              networkFee: networkFee,
              total: total,
            });
          }
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    }
  };
  const onPressSend = () => {
    if (addressSend.value != '') {
      ValidateSendAddress();
    }
    callAPIForPay();
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
        </View>
      </View>
    );
  };

  const renderTextBox = () => {
    return (
      <View style={textInputMainContainer}>
        <TextInputCustom
          title={'send to'}
          validation={addressSend}
          setValue={(text, isCheck = false) => {
            if (isCheck === false) {
              setAddressSend({value: text, error: ''});
            }
          }}
        />

        <View style={{marginTop: 20}}>
          <TextInputCustom
            title={'BTC Amount'}
            validation={btcAmount}
            setValue={(text, isCheck = false) => {
              if (isCheck === false) {
                setBtcAmount({value: text, error: ''});
              }
            }}
          />
        </View>
      </View>
    );
  };

  const renderAddress = () => {
    return (
      <View style={addressContainer}>
        <View>
          <Text style={grayLabel}>From</Text>
          <Text style={balanceText}>{address.address}</Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={grayLabel}>To</Text>
          <Text style={balanceText}>{addressSend.value}</Text>
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

        <View style={infoButtonContainer}>
          <View>
            <ButtonShadowCustom
              otherStyle={[
                btnStyle,
                {backgroundColor: PressSlow ? '#7596EB' : '#D7DCE4'},
              ]}
              text={'Slow'}
              textStyle={btnText}
              onPress={onPressSlow}
            />
          </View>

          <View style={buttonSubContainer}>
            <ButtonShadowCustom
              text={'Average'}
              textStyle={btnText}
              otherStyle={[
                btnStyle,
                {backgroundColor: PressAverage ? '#7596EB' : '#D7DCE4'},
              ]}
              onPress={onPressAverage}
            />
          </View>

          <View>
            <ButtonShadowCustom
              text={'Fastest'}
              textStyle={btnText}
              otherStyle={[
                btnStyle,
                {backgroundColor: PressFastest ? '#7596EB' : '#D7DCE4'},
              ]}
              onPress={onPressFastest}
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={grayLabel}>fee Total</Text>
          <View style={feeContainer}>
            <Text style={[balanceText, {textDecorationLine: 'underline'}]}>
              {feeTotal}
            </Text>
            <Text style={[balanceText, {textDecorationLine: 'underline'}]}>
              {feeTime}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={grayLabel}>Total</Text>
          <Text style={balanceText}>{countTotalFund()}</Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={buttonContainer}>
        {(isError && (
          <ButtonShadowCustom
            otherStyle={errorButton}
            text={'Incorrect address!'}
            textStyle={btnText}
          />
        )) || <ButtonCustom onPress={onPressSend} text={'Send'} />}
      </View>
    );
  };

  return (
    <ScrollView style={container}>
      <View style={{marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        <View style={{marginLeft: 28}}>
          <NavigationCustomComponent title={'Send'} />
        </View>

        {renderBlock()}
        {renderTextBox()}
        {renderAddress()}
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
    marginHorizontal: 10,
  },
  headerText1: {
    fontSize: sizes.h12,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    lineHeight: lineHeights.h10,
  },
  balanceText: {
    fontSize: sizes.h12,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    lineHeight: lineHeights.h10,
  },
  textInputMainContainer: {
    marginTop: 26,
    marginHorizontal: 28,
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
    marginHorizontal: 20,
  },
  btnStyle: {
    height: 27,
    backgroundColor: '#D7DCE4',
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
  infoSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  addressContainer: {
    marginTop: 18,
    marginHorizontal: 28,
  },
  infoMainContainer: {
    marginLeft: 28,
    marginTop: 15,
  },
  infoButtonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  errorButton: {
    backgroundColor: '#F6543E',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    walletData: state.account.walletData,
    userDetails: state.account.userDetails,
    transactionsData: state.account.transactionsData,
  };
};

export default connect(mapStateToProps, {
  setShowInfoPopUP,
  sendTransactions,
  getFee,
  validateAddress,
})(SendMainScreen);
