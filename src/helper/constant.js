import {Dimensions, Platform} from 'react-native';

module.exports = {
  appName: 'Test',
  isLoadShow: true,
  isShowAPI: true,
  apiTesting: false,

  /** screen */
  screen: Dimensions.get('window'),
  screenHeight:
    (Platform.OS === 'ios' && Dimensions.get('window').height) ||
    Dimensions.get('window').height - 24,
  screenWidth: Dimensions.get('window').width,
  fullScreenHeight: Dimensions.get('window').height,
  buttonWidth: Dimensions.get('window').width - 36,

  /** iphone and android condition */
  isIOS: Platform.OS === 'ios',
  isANDROID: Platform.OS === 'android',

  /** common color */
  screenBackground: '#FFFFFF',
  backgroundStartGradient: '#628DFB',
  backgroundEndGradient: '#537DE6',
  textColor: '#537CE5',
  appRedColor: '#E72D5F',

  tabIcon: {
    Wallet: 'icon_wallet',
    Send: 'icon_send',
    Chart: 'icon_chart',
    Settings: 'icon_setting',
  },
  tabSelected: '#628DFC',
  tabUnSelected: '#D7DCE4',
  tabBarHeight: 60,

  /** Home screen **/
  startHomeGradient: '#587FE4',
  endHomeGradient: '#537BE5',
};

/*
{ fontWeight: '100' }, // Thin
{ fontWeight: '200' }, // Ultra Light
{ fontWeight: '300' }, // Light
{ fontWeight: '400' }, // Regular
{ fontWeight: '500' }, // Medium
{ fontWeight: '600' }, // Semibold
{ fontWeight: '700' }, // Bold
{ fontWeight: '800' }, // Heavy
{ fontWeight: '900' }, // Black
 */
