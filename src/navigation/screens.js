import Constant from '../helper/constant';
import React from 'react';

//Intial Flow
import AppRouterScreen from '../screens/AppRouter';
import LoginScreen from '../screens/login/login';
import SecurityScreen from '../screens/security/security';
import SuccessScreen from '../screens/success/success';
import FailedScreen from '../screens/failed/failed';
import WalletAccountCreationScreen from '../screens/login/wallet';
import RecoveryPhraseScreen from '../screens/login/recovery_phrase';
import SuccessfulCreationScreen from '../screens/login/successful_creation';
import WalletMainScreen from '../screens/wallet/wallet_main';
import AppTabScreen from './app_tab';
import TransactionsScreen from '../screens/wallet/transactions';
import ReceiveQRScreen from '../screens/wallet/receive_qr';
import SendMainScreen from '../screens/send/send';
import SendSuccessScreen from '../screens/send/send_success';
import SendErrorScreen from '../screens/send/send_error';

import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const Stack =
  (Constant.isIOS && createNativeStackNavigator()) ||
  createNativeStackNavigator();

export function Screen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="initialPage"
        options={{stackAnimation: 'none'}}
        component={AppRouterScreen}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="FailedScreen" component={FailedScreen} />
      <Stack.Screen
        name="WalletAccountCreationScreen"
        component={WalletAccountCreationScreen}
      />
      <Stack.Screen
        name="RecoveryPhraseScreen"
        component={RecoveryPhraseScreen}
      />
      <Stack.Screen
        name="SuccessfulCreationScreen"
        component={SuccessfulCreationScreen}
      />
      <Stack.Screen name="WalletMainScreen" component={WalletMainScreen} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="ReceiveQRScreen" component={ReceiveQRScreen} />

      <Stack.Screen name="SendMainScreen" component={SendMainScreen} />
      <Stack.Screen name="SendSuccessScreen" component={SendSuccessScreen} />
      <Stack.Screen name="SendErrorScreen" component={SendErrorScreen} />

      <Stack.Screen
        options={{stackAnimation: 'none'}}
        name="AppTabScreen"
        component={AppTabScreen}
      />
    </Stack.Navigator>
  );
}
