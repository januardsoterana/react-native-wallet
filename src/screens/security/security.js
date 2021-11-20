import React, {useState} from 'react';
import TextInputCustom from '../../../src/component/TextInputCustom/TextInputCustom';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import {useNavigation} from '@react-navigation/native';
import {restoreWallet, setUserDetail} from '../../modules/account/actions';
import {connect} from 'react-redux';
import {accountStack} from '../../navigation/navigator';
import constant from '../../helper/constant';

const securityScreen = props => {
  const {
    container,
    mainText,
    textInputMainContainer,
    textInputContainer,
    buttonContainer,
    subContainer,
  } = styles;

  const navigation = useNavigation();

  const [phrasename, setPhraseName] = useState({value: '', error: ''});
  const [secret, setSecret] = useState({value: '', error: ''});

  const checkImportEnable = () => {
    if (phrasename.value === '') {
      return true;
    }
    return false;
  };

  const onPressImport = () => {
    if (phrasename.value === '') {
      alert('Please Enter Phrase...');
    } else {
      props
        .restoreWallet(phrasename.value, secret.value)
        .then(res => {
          switch (res.result.status) {
            case 1:
              saveUserData(res.result);
              const balance = res.result.address.balance;
              navigation.navigate(accountStack.success, {
                balance: balance,
              });
              break;
            case 0:
              navigation.navigate(accountStack.failed);
              setPhraseName('');
              setSecret('');
              break;
            default:
              break;
          }
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    }
  };

  const saveUserData = data => {
    AsyncStorage.setItem('user', JSON.stringify(data));
    props.setUserDetail(data);
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={mainText}>{'Security'}</Text>
      </View>
    );
  };

  const renderTextInput = () => {
    return (
      <View>
        <View style={textInputMainContainer}>
          <View style={textInputContainer}>
            <View>
              <TextInputCustom
                title={'Enter phrase here'}
                placeHolder={'Enter phrase here'}
                validation={phrasename}
                setValue={(text, isCheck = false) => {
                  if (isCheck === false) {
                    setPhraseName({value: text, error: ''});
                  }
                }}
              />
            </View>
          </View>

          <TextInputCustom
            placeHolder={'Secret'}
            validation={secret}
            setValue={(text, isCheck = false) => {
              if (isCheck === false) {
                setSecret({value: text, error: 'sds'});
              }
            }}
          />
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
        <ButtonCustom
          onPress={onPressImport}
          text={'Import'}
          isDisable={checkImportEnable()}
          isLoading={props.isLoading}
        />
      </View>
    );
  };

  return (
    <View style={container}>
      <View
        style={[
          subContainer,
          {marginTop: 53 + props.safeAreaInsetsDefault.top},
        ]}>
        {renderHeader()}
        {renderTextInput()}
      </View>
      {renderBottom()}
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
    paddingHorizontal: 24,
  },
  mainText: {
    fontSize: sizes.h5,
    color: '#4F4F4f',
    fontFamily: fonts.fontRobotoBold,
    textAlign: 'center',
  },
  text: {
    color: '#537CE5',
    fontSize: 15,
  },
  textInputContainer: {
    marginBottom: 0,
  },
  textInputMainContainer: {
    marginTop: constant.screenHeight * 0.14,
  },
  buttonContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.account.isLoading,
    apiWaitingTime: state.account.apiWaitingTime,
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {
  restoreWallet,
  setUserDetail,
})(securityScreen);
