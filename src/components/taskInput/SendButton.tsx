import {Pressable} from 'react-native';
import React from 'react';
import CustomIcon from '../../utils/CustomIcon';

const SendButton = ({
  taskValue,
  onPress,
  textColor,
}: {
  taskValue: string;
  onPress: (taskValue: string) => void;
  textColor: string;
}) => {
  return (
    <Pressable
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}
      testID="submitButton"
      onPress={() => onPress(taskValue)}>
      <CustomIcon name="send" dir="FontAwesome" color={textColor} />
    </Pressable>
  );
};

export default SendButton;
