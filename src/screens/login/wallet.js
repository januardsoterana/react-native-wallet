import React, {useEffect, useState} from 'react';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import {useNavigation} from '@react-navigation/native';
import {accountStack} from '../../navigation/navigator';
import {connect} from 'react-redux';
import constant from '../../helper/constant';

const WalletAccountCreationScreen = props => {
  const navigation = useNavigation();

  useEffect(() => {
    onPressCheckMark();
  }, []);

  const {
    container,
    subContainer,
    mainText,
    descriptionContainer,
    descriptionText,
    termsSubContainer,
    termsText,
    checkMarkBox,
    checkMarkEmptyBox,
    image,
    buttonSubContainer,
    buttonContainer,
    subContainerMain,
  } = styles;

  const [checkMark, setCheckMark] = useState(false);

  const onPressContinue = () => {
    navigation.navigate(accountStack.recovery_phrase);
  };

  const onPressCheckMark = () => {
    setCheckMark(true);
  };

  const onPressNoCheckMark = () => {
    if (checkMark === true) {
      setCheckMark(false);
    }
  };
  const renderHeader = () => {
    return (
      <View style={subContainer}>
        <Text style={mainText}>{'New wallet'}</Text>
        <View style={descriptionContainer}>
          <Text style={descriptionText}>
            {
              'In the next step you will see 12 words that allows you to recover a wallet'
            }
          </Text>
        </View>
        <View style={termsSubContainer}>
          <TouchableOpacity
            style={checkMarkEmptyBox}
            onPress={onPressCheckMark}
          />
          {checkMark ? (
            <TouchableOpacity style={checkMarkBox} onPress={onPressNoCheckMark}>
              <Image
                source={{uri: 'check'}}
                style={image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : null}

          <Text style={termsText}>
            {
              'I understand if i lose my recovery words, i will \n not be able to access my wallet'
            }
          </Text>
        </View>
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
        <ButtonCustom text={'Continue'} onPress={onPressContinue} />
      </View>
    );
  };

  return (
    <View style={container}>
      <View
        style={[
          subContainerMain,
          {marginTop: 53 + props.safeAreaInsetsDefault.top},
        ]}>
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
  safeAresContainer: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
  },
  subContainerMain: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: constant.screenHeight * 0.141,
    marginHorizontal: 24,
  },
  descriptionText: {
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    color: '#4F4F4F',
    fontSize: sizes.h12,
  },
  termsSubContainer: {
    marginTop: constant.screenHeight * 0.12,
    flexDirection: 'row',
  },
  termsText: {
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    color: '#4F4F4F',
    fontSize: sizes.h13,
    marginHorizontal: 17,
  },
  checkMarkBox: {
    marginTop: 8,
    width: 18,
    height: 18,
    backgroundColor: '#537CE5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  checkMarkEmptyBox: {
    marginTop: 8,
    width: 18,
    height: 18,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  mainText: {
    fontSize: sizes.h5,
    color: '#4F4F4f',
    fontFamily: fonts.fontRobotoBold,
  },
  buttonSubContainer: {
    marginBottom: '40%',
  },
  buttonContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 14,
    width: 14,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(WalletAccountCreationScreen);
