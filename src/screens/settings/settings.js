import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import fonts, {sizes} from '../../helper/fonts';
import {connect} from 'react-redux';
import NavigationCustomComponent from '../../component/Navigation/NavigationCustom';
import constant from '../../helper/constant';

const SettingsMainScreen = props => {
  const {container} = styles;

  return (
    <View style={container}>
      <View style={{marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        <View style={{marginLeft: 28}}>
          <NavigationCustomComponent title={'Settings'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.screenBackground,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(SettingsMainScreen);
