import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {useNavigation} from '@react-navigation/native';
import {appTabStack} from '../../navigation/navigator';
import {connect} from 'react-redux';
import constant from '../../helper/constant';
import {loadAppData} from '../../modules/account/actions';

const SuccessfulCreationScreen = props => {
  const {
    container,
    mainText,
    messageContainer,
    messageText,
    buttonContainer,
    buttonColor,
    subContainer,
  } = styles;
  const navigation = useNavigation();

  const onPresStart = () => {
    props.loadAppData();
    navigation.reset({
      index: 0,
      routes: [{name: appTabStack.app_tab}],
    });
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={mainText}>{'Successfull creation'}</Text>
      </View>
    );
  };

  const renderMessage = () => {
    return (
      <View style={messageContainer}>
        <Text style={messageText}>{'Your wallet successfully created !'}</Text>
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
          onPress={onPresStart}
          text={'Let’s start'}
          otherStyle={buttonColor}
          startGradient={'#3BAD60'}
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
        {renderBottom()}
      </View>
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
    marginTop: constant.screenHeight * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 50,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {loadAppData})(
  SuccessfulCreationScreen,
);
