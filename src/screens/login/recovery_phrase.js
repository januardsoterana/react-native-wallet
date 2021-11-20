import React, {useState, useEffect} from 'react';
import ButtonCustom from '../../component/ButtonCustom/ButtonCustom';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {accountStack} from '../../navigation/navigator';
import Constant from '../../helper/constant';
import {connect} from 'react-redux';
import {createWallet, setUserDetail} from '../../modules/account/actions';
import constant from '../../helper/constant';
import ButtonShadowCustom from '../../component/ShadowCustom/ButtonShadowCustom';

const RecoveryPhraseScreen = props => {
  const navigation = useNavigation();

  const {
    container,
    subContainer,
    mainText,
    descriptionContainer,
    descriptionText,
    copyContainer,
    underlineTextContainer,
    ButtonText,
    buttonSubContainer,
    subContainerMain,
    copyBtnStyle,
    copyText,
    bottomText,
    buttonContainer,
  } = styles;

  const [recoveryPhrase, setRecoveryPhrase] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    props
      .createWallet()
      .then(res => {
        switch (res.result.status) {
          case 1:
            let value = res.result.wallet.phrase;
            setRecoveryPhrase(value);
            saveUserData(res.result);
            break;
          default:
            break;
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  };

  const saveUserData = data => {
    AsyncStorage.setItem('user', JSON.stringify(data));
    props.setUserDetail(data);
  };

  const copyLink = () => {
    let temp = '';
    for (let i = 0; i < recoveryPhrase.length; i++) {
      if (i === 0) {
        temp = recoveryPhrase[0];
      } else {
        temp = temp + ' ' + recoveryPhrase[i];
      }
    }
    Clipboard.setString(temp);
  };

  const onPressContinue = () => {
    navigation.navigate(accountStack.successful_creation);
  };

  const renderHeader = () => {
    return (
      <View style={subContainer}>
        <Text style={mainText}>{'Recovery phrase'}</Text>
        <View style={descriptionContainer}>
          <Text style={descriptionText}>
            {
              'Write down or copy these words in the right order and save the somewhere safe.'
            }
          </Text>
        </View>
      </View>
    );
  };

  const renderCode = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={buttonContainer}>
          {recoveryPhrase.length === 0 && <ActivityIndicator />}
          {recoveryPhrase.map((obj, index) => {
            return (
              <TouchableOpacity style={[underlineTextContainer]}>
                <Text style={ButtonText}>{obj}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCopyButton = () => {
    return (
      <View style={copyContainer}>
        <ButtonShadowCustom
          image={'copy'}
          otherStyle={copyBtnStyle}
          text={'Copy'}
          textStyle={copyText}
          onPress={copyLink}
        />
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        <Text style={bottomText}>{'Never share recovery phrase !'}</Text>
        <View style={buttonSubContainer}>
          <ButtonCustom text={'Continue'} onPress={onPressContinue} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={container}>
      <View>
        <View
          style={[
            subContainerMain,
            {marginTop: 53 + props.safeAreaInsetsDefault.top},
          ]}>
          {renderHeader()}
          {renderCode()}
          {renderCopyButton()}
          {renderBottom()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.screenBackground,
  },
  subContainerMain: {
    flex: 1,
  },
  subContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: constant.screenHeight * 0.11,
    marginHorizontal: 24,
  },
  descriptionText: {
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    color: '#4F4F4F',
    fontSize: sizes.h12,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap',
    marginLeft: 22,
    marginRight: 14,
  },
  ButtonText: {
    color: '#828282',
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    fontSize: sizes.h17,
    paddingBottom: 5,
  },
  bottomText: {
    color: '#4F4F4F',
    fontFamily: fonts.fontRobotoRegular,
    textAlign: 'center',
    fontSize: sizes.h13,
    marginVertical: 30,
    fontWeight: '500',
  },
  imageOtherStyles: {
    width: 50,
    height: 50,
  },
  underlineTextContainer: {
    borderBottomWidth: 2,
    borderColor: '#828282',
    flexDirection: 'row',
    width: (Constant.screenWidth - 96) / 3,
    marginRight: 20,
    marginBottom: 28,
  },
  mainText: {
    fontSize: sizes.h5,
    color: '#4F4F4f',
    fontFamily: fonts.fontRobotoBold,
  },
  buttonSubContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyContainer: {
    textAlign: 'center',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBtnStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#082330',
    borderRadius: 50,
  },
  copyText: {
    color: '#537CE5',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {
  createWallet,
  setUserDetail,
})(RecoveryPhraseScreen);
