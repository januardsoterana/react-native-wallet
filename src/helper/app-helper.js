import React from 'react';
import {Alert, NativeModules} from 'react-native';
import constant from './constant';
const {AndroidNativeModule} = NativeModules;

const onPressLeftPress = res => {
  console.log('not Handle');
};

const onPressRightPress = res => {
  console.log('not Handle');
};

export function showThemeAlert(objAlert) {
  let defaultAlertObj = {
    title: '',
    message: '',
    leftBtn: '',
    rightBtn: '',
    isLightTheme: false,
    leftPress: onPressLeftPress,
    rightPress: onPressRightPress,
    styleLeft: 'default',
    styleRight: 'default',
  };
  Object.assign(defaultAlertObj, objAlert);
  if (constant.isANDROID) {
    // AndroidNativeModule.showThemeAlert
    AndroidNativeModule.showThemeAlert(
      defaultAlertObj.title,
      defaultAlertObj.message,
      defaultAlertObj.leftBtn,
      defaultAlertObj.rightBtn,
      defaultAlertObj.isLightTheme,
      defaultAlertObj.leftPress,
      defaultAlertObj.rightPress,
    );
  } else {
    Alert.alert(defaultAlertObj.title, defaultAlertObj.message, [
      {
        text: defaultAlertObj.leftBtn,
        onPress: defaultAlertObj.leftPress,
        style: defaultAlertObj.styleLeft,
      },
      {
        text: defaultAlertObj.rightBtn,
        onPress: defaultAlertObj.rightPress,
        style: defaultAlertObj.styleRight,
      },
    ]);
  }
}
