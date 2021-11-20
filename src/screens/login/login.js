import React from 'react';
import constant from '../../helper/constant';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import {useNavigation} from '@react-navigation/native';
import {accountStack} from '../../navigation/navigator';
import {connect} from 'react-redux';

const LoginScreen = props => {
  const navigation = useNavigation();

  const {
    container,
    subContainer,
    mainText,
    image,
    descriptionText,
    descriptionContainer,
    buttonSubContainer,
    buttonWidth,
    imageContainer,
  } = styles;

  const onPressNewWallet = () => {
    navigation.navigate(accountStack.security);
  };

  const onPressCreateWallet = () => {
    navigation.navigate(accountStack.wallet_account_creation);
  };

  const renderHeader = () => {
    return (
      <View style={subContainer}>
        <Text style={mainText}>Log in</Text>
        <View style={imageContainer}>
          <Image source={{uri: 'wallet'}} style={image} resizeMode="contain" />
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View
        style={[
          buttonSubContainer,
          {
            height:
              props.safeAreaInsetsDefault.bottom + constant.screenHeight * 0.3,
          },
        ]}>
        <View>
          <View style={buttonWidth}>
            <ButtonCustom
              text={'Create new wallet'}
              onPress={onPressCreateWallet}
            />
          </View>
        </View>
        <View style={descriptionContainer}>
          <TouchableOpacity onPress={onPressNewWallet}>
            <Text style={descriptionText}>{'I already have a wallet'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <View style={{flex: 1, marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        {renderHeader()}
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
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonWidth: {width: 205},
  mainText: {
    fontSize: sizes.h5,
    color: '#4F4F4f',
    fontFamily: fonts.fontRobotoBold,
  },
  image: {
    width: constant.screenWidth - 74,
    height: constant.screenWidth - 74,
  },
  walletMarginTop: {
    marginTop: 100,
  },
  descriptionText: {
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    color: constant.textColor,
    fontSize: sizes.h17,
  },
  descriptionContainer: {
    marginTop: 35,
    marginBottom: '20%',
  },
  buttonContainer: {
    flex: 1,
  },
  buttonSubContainer: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(LoginScreen);
