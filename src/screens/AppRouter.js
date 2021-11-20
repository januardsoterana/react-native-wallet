import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {appTabStack, accountStack} from '../navigation/navigator';
import SafeArea from 'react-native-safe-area';
import {cloneDeep} from 'lodash';
import {
  setSafeAreaIntent,
  loadAppData,
  setShowPopUP,
  setShowQRPopUP,
  setShowInfoPopUP,
} from '../modules/account/actions';
import Constant from '../helper/constant';

const InitComponent = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setSafeArea();
    resetRedux();
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        props.loadAppData();
        navigation.reset({
          index: 0,
          routes: [{name: appTabStack.app_tab}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: accountStack.login}],
        });
      }
    });
  });

  const resetRedux = () => {
    props.setShowPopUP({
      isShow: false,
      data: '',
    });
    props.setShowQRPopUP({
      isShow: false,
      data: '',
    });
    props.setShowInfoPopUP({
      isShow: false,
      data: '',
    });
  };

  const setSafeArea = () => {
    if (Constant.isIOS) {
      SafeArea.getSafeAreaInsetsForRootView().then(result => {
        let temp = {
          top:
            result.safeAreaInsets.top > 0
              ? result.safeAreaInsets.top - 20
              : result.safeAreaInsets.top,
          bottom: result.safeAreaInsets.bottom,
          left: result.safeAreaInsets.left,
          right: result.safeAreaInsets.right,
        };
        let obj = cloneDeep(temp);
        props.setSafeAreaIntent(obj);
      });
    }
  };

  return <View />;
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  setSafeAreaIntent,
  loadAppData,
  setShowPopUP,
  setShowQRPopUP,
  setShowInfoPopUP,
})(InitComponent);
