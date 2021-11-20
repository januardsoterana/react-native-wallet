/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {StatusBar, Text, View, TextInput, LogBox} from 'react-native';
import AsyncStorage2 from '@react-native-async-storage/async-storage';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.allowFontScaling = false;
TextInput.allowFontScaling = false;

import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {Screen} from './navigation/screens';
import {ThemeContext} from 'AppTheme';
import storage from 'redux-persist/lib/storage';
import AppReducer from './reducer';
import InitialSplashView from './component/InitSplashScreen/initialSplashScreen';
import thunk from 'redux-thunk';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';

//React-native-screen use in globally
enableScreens();

//setup navigation
const persistConfig = {
  key: 'root',
  storage,
  getStoredState: getStoredStateMigrateV4({
    blacklist: ['navigation'],
    storage: AsyncStorage2,
  }),
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

//Ignore to show warning.
LogBox.ignoreAllLogs();

const App: () => Node = () => {
  const [theme] = useState('DARK');

  return (
    <Provider store={store}>
      <PersistGate loading={<InitialSplashView />} persistor={persistor}>
        <ThemeContext.Provider value={theme}>
          <View style={{flex: 1}}>
            <StatusBar hidden={false} barStyle="dark-content" />
            <NavigationContainer>
              <Screen />
            </NavigationContainer>
          </View>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
