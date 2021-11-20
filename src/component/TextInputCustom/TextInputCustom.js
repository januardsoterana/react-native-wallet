import React, {useState, useEffect} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import fonts from '../../helper/fonts';

const TextInputCustomComponent = props => {
  const {textInputStyle, labelStyle} = styles;

  const [borderColor, setBorderColor] = useState('#828282');
  const [labelColor, setLabelColor] = useState('#4F4F4F');

  const onFocus = () => {
    setBorderColor('#537CE5');
    setLabelColor('#537CE5');
  };

  const onblur = () => {
    setBorderColor('#828282');
  };

  return (
    <View>
      <View>
        <Text style={[labelStyle, {color: labelColor}]}>{props.title}</Text>
        <TextInput
          placeholder={props.placeHolder}
          style={[textInputStyle, {borderBottomColor: borderColor}]}
          onFocus={onFocus}
          onBlur={onblur}
          value={props.validation.value}
          onChangeText={text => {
            props.setValue(text);
          }}
          defaultValue={props.defaultValue}
          keyboardType={props.keyboardInputType || 'default'}
        />
      </View>
    </View>
  );
};
export default TextInputCustomComponent;

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#828282',
    height: 40,
  },
  labelStyle: {
    color: '#537CE5',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: fonts.fontViga,
    lineHeight: 15,
  },
});
