import React from 'react';

import {Pressable} from 'react-native';

import Animated, {
  FadeInRight,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {taskData} from '../../utils/context';
import CustomIcon from '../../utils/CustomIcon';
import firestore from '@react-native-firebase/firestore';

const EditButton = ({task}: {task: taskData}) => {
  const opacity = useSharedValue(1);
  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const toggleEditMode = async (task: taskData) => {
    await firestore().collection('todos').doc(task.id.toString()).update({
      isEditMode: !task.isEditMode,
    });
  };
  return (
    <Animated.View
      style={[
        {
          height: 40,
          width: 40,
          marginVertical: 10,
          position: 'absolute',
          top: 0,
          right: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        AnimatedOpacity,
      ]}
      entering={FadeInRight.duration(500)}
      exiting={FadeOutRight.duration(250)}>
      <Pressable onPress={() => toggleEditMode(task)}>
        <CustomIcon name="edit" size={22} dir="Feather" />
      </Pressable>
    </Animated.View>
  );
};

export default EditButton;
