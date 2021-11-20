import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import TabBarIcon from './container/TabBarIcon';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import WalletMainScreen from '../screens/wallet/wallet_main';
import SendMainScreen from '../screens/send/send';
import ChartMainScreen from '../screens/chart/chart';
import SettingsMainScreen from '../screens/settings/settings';
import constant from '../helper/constant';
import Transactions from '../screens/wallet/transactions';
import ReceiveQR from '../screens/wallet/receive_qr';
import FeeInfoScreen from '../screens/send/fee_info';
import {
  setShowPopUP,
  setShowQRPopUP,
  setShowInfoPopUP,
} from '../modules/account/actions';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import SendSuccessScreen from '../screens/send/send_success';
import SendErrorScreen from '../screens/send/send_error';

const Tab = createBottomTabNavigator();
let InitRootName = 'Wallet';
let tabLeftSpace = 0;

function MyTabs(obj) {
  return (
    <Tab.Navigator
      initialRouteName={InitRootName}
      tabBarPosition={'bottom'}
      tabBar={props => {
        return (
          <View
            style={{
              height:
                (obj.safeArea && obj.safeArea !== 0 && 90) ||
                constant.tabBarHeight,
            }}>
            <BottomTabBar
              {...props}
              navigation={props.navigation}
              style={{backgroundColor: 'transparent', elevation: 0}}
            />
          </View>
        );
      }}
      tabBarOptions={{
        showLabel: false,
        style: styles.shadowBox,
      }}>
      <Tab.Screen
        name="Wallet"
        component={WalletMainScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => {
            return (
              <TabBarIcon
                tintColor={tintColor}
                tabName={'Wallet'}
                focused={focused}
                marginLeft={tabLeftSpace}
              />
            );
          },
          tabBarOnPress: ({navigation, defaultHandler}) => {
            return defaultHandler();
          },
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendMainScreen}
        options={{
          tabBarLabel: 'Send',
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarIcon
              tintColor={tintColor}
              tabName={'Send'}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartMainScreen}
        options={{
          tabBarLabel: 'Chart',
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarIcon
              tintColor={tintColor}
              tabName={'Chart'}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsMainScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarIcon
              tintColor={tintColor}
              tabName={'Settings'}
              focused={focused}
              marginLeft={tabLeftSpace}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppTab = props => {
  const {container} = styles;

  const onHidePopup = () => {
    props.setShowPopUP({
      isShow: false,
      data: '',
    });
  };

  const onHideQRPopup = () => {
    props.setShowQRPopUP({
      isShow: false,
      data: '',
    });
  };

  const onHideInfoPopup = () => {
    props.setShowInfoPopUP({
      isShow: false,
      data: '',
    });
  };

  return (
    <View style={container}>
      <StatusBar backgroundColor={'#000000'} />
      <MyTabs safeArea={props.safeAreaInsetsDefault.bottom} />

      {props.showPopup.isShow && (
        <Transactions data={props.showPopup.data} onAlertClick={onHidePopup} />
      )}
      {props.showPopupQR.isShow && (
        <ReceiveQR data={props.showPopupQR.data} onAlertClick={onHideQRPopup} />
      )}
      {props.showPopupInfo.isShow && (
        <FeeInfoScreen
          data={props.showPopupInfo.data}
          onAlertClick={onHideInfoPopup}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowBox: {
    elevation: 4,
    marginBottom: 5,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    shadowColor: 'green',
    shadowOffset: {width: 10, height: -3},
    shadowOpacity: 0.5,
    shadowRadius: 10.0,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    showPopup: state.account.showPopup,
    showPopupQR: state.account.showPopupQR,
    showPopupInfo: state.account.showPopupInfo,
  };
};

export default connect(mapStateToProps, {
  setShowPopUP,
  setShowQRPopUP,
  setShowInfoPopUP,
})(AppTab);
