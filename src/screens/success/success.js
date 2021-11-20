import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {appTabStack} from '../../navigation/navigator';
import {connect} from 'react-redux';
import constant from '../../helper/constant';
import {loadAppData} from '../../modules/account/actions';

const SuccessScreen = props => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const {
    container,
    mainText,
    messageContainer,
    messageText,
    lightText,
    balanceContainer,
    buttonContainer,
    balanceText,
    buttonColor,
    subContainer,
  } = styles;

  const {balance} = params;

  const onContinue = () => {
    props.loadAppData();
    navigation.reset({
      index: 0,
      routes: [{name: appTabStack.app_tab}],
    });
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={mainText}>{'Success'}</Text>
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={messageContainer}>
        <Text style={messageText}>{'Wallet successfully imported!'}</Text>

        <Text style={lightText}>{'Scanning wallet balance ...'}</Text>

        <View style={balanceContainer}>
          <Text style={messageText}>{'Wallet balance:'}</Text>

          <Text style={balanceText}>{balance + ' ' + 'BTC'}</Text>
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View
        style={[
          buttonContainer,
          {
            bottom:
              props.safeAreaInsetsDefault.bottom + constant.screenHeight * 0.23,
          },
        ]}>
        <ButtonCustom
          otherStyle={buttonColor}
          onPress={onContinue}
          text={'Continue'}
          startGradient={'#3CAE60'}
          endGradient={'#339753'}
        />
      </View>
    );
  };

  return (
    <View style={container}>
      <View
        style={[
          subContainer,
          {marginTop: 53 + props.safeAreaInsetsDefault.top},
        ]}>
        {renderHeader()}
        {renderMessage()}
      </View>
      {renderBottom()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.screenBackground,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  mainText: {
    fontSize: sizes.h6,
    color: '#4F4F4f',
    fontFamily: fonts.fontRobotoBold,
    textAlign: 'center',
  },
  messageText: {
    fontSize: sizes.h12,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    textAlign: 'center',
  },
  lightText: {
    marginTop: 10,
    fontSize: sizes.h12,
    color: '#AEB6CE',
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
  },
  balanceText: {
    fontSize: sizes.h6,
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoBold,
    textAlign: 'center',
  },
  messageContainer: {
    marginTop: constant.screenHeight * 0.145,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColor: {
    backgroundColor: '#27AE60',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {loadAppData})(SuccessScreen);
