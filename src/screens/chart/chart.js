import React from 'react';
import {View, StyleSheet} from 'react-native';
import NavigationCustomComponent from '../../component/Navigation/NavigationCustom';
import {connect} from 'react-redux';
import constant from '../../helper/constant';

const ChartMainScreen = props => {
  const {container} = styles;

  return (
    <View style={container}>
      <View style={{marginTop: 53 + props.safeAreaInsetsDefault.top}}>
        <View style={{marginLeft: 28}}>
          <NavigationCustomComponent title={'Chart'} />
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

export default connect(mapStateToProps, {})(ChartMainScreen);
