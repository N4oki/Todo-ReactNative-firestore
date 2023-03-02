import React from 'react';

import {Pressable} from 'react-native';

import Animated, {
  FadeInRight,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {TaskData} from '../../utils/context';
import CustomIcon from '../../utils/CustomIcon';
import {updater} from '../../utils/firestoreUpdater';

const EditButton = ({task}: {task: TaskData}) => {
  const opacity = useSharedValue(1);
  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
      <Pressable
        onPress={() =>
          updater({
            key: 'toggleEditMode',
            id: task.id,
            editModeTask: task,
          })
        }>
        <CustomIcon name="edit" size={22} dir="Feather" />
      </Pressable>
    </Animated.View>
  );
};

export default EditButton;
