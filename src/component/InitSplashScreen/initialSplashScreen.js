import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Constant from '../../helper/constant';
import DeviceInfo from 'react-native-device-info';

const InitialScreen = props => {
  let topNavigation = 20;
  let value = parseFloat(DeviceInfo.getSystemVersion());
  if (value <= 5.1) {
    topNavigation = -10;
  }

  const {container, icon} = styles;

  return (
    <View style={container}>
      <Image
        source={{uri: 'splash_icon'}}
        resizeMode={'contain'}
        style={[icon, {marginTop: (Constant.isANDROID && topNavigation) || 0}]}
      />
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.backProgressBarColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: (Constant.isIOS && 78) || 78,
    width: (Constant.isIOS && 200) || 200,
  },
});
