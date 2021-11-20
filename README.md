React-Native-Wallet
=======

## Table of Contents

* [yarn](#yarn)
* [npm start](#npm-start)
* [npm run ios](#npm-run-ios)
* [npm run android](#npm-run-android)


### `yarn`

Runs your app in development mode.
```
yarn install
```

### `npm start`

Runs your app in development mode.
```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:
