import {Pressable} from 'react-native';
import React from 'react';
import CustomIcon from '../../utils/CustomIcon';
import {TaskData} from '../../utils/context';

const SendButton = ({
  taskValue,
  onPress,
  textColor,
  editModeTask,
}: {
  taskValue: string;
  editModeTask: TaskData | undefined;
  onPress: (taskValue: string, editModeTask: TaskData | undefined) => void;
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
      onPress={() => onPress(taskValue, editModeTask)}>
      <CustomIcon name="send" dir="FontAwesome" color={textColor} />
    </Pressable>
  );
};

export default SendButton;
