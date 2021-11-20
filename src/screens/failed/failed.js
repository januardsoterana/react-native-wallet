import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {useNavigation} from '@react-navigation/native';
import {accountStack} from '../../navigation/navigator';
import constant from '../../helper/constant';
import {connect} from 'react-redux';
import {restoreWallet} from '../../modules/account/actions';

const FailedScreen = props => {
  const {
    container,
    mainText,
    messageContainer,
    messageText,
    buttonContainer,
    subContainer,
  } = styles;
  const navigation = useNavigation();

  const onPressBtn = () => {
    navigation.navigate(accountStack.security);
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={mainText}>{'Failed'}</Text>
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={messageContainer}>
        <Text style={messageText}>
          {'You’ve entered incorrect phrase, please try again'}
        </Text>
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
        <ButtonCustom onPress={onPressBtn} text={'Try again'} />
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
  messageContainer: {
    marginTop: constant.screenHeight * 0.16
  },
  buttonContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(FailedScreen);
