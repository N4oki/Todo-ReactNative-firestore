import {Pressable} from 'react-native';
import React from 'react';
import CustomIcon from '../../utils/CustomIcon';

const AddButton = ({
  textColor,
  onPress,
}: {
  textColor: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}
      onPress={() => onPress()}>
      <CustomIcon name="check-square" dir="Feather" color={textColor} />
    </Pressable>
  );
};

export default AddButton;
