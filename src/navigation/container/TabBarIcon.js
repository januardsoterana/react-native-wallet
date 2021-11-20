import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import constant from '../../helper/constant';
import {connect} from 'react-redux';

const AppTab = props => {
  const {container, imageIcon} = styles;
  const {tabName, focused, marginLeft} = props;

  return (
    <View style={container}>
      <Image
        source={{uri: constant.tabIcon[tabName]}}
        style={[
          imageIcon,
          {
            marginLeft: marginLeft,
            tintColor:
              (focused && constant.tabSelected) || constant.tabUnSelected,
          },
        ]}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 7,
  },
  imageIcon: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(AppTab);
