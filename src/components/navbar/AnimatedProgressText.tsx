import React, {useEffect} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppContext} from '../../utils/context';
import {getPercentage, getSelectedItem} from '../../utils/tools';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

const AnimatedProgressText = () => {
  const {taskData, userData} = useAppContext();

  const percentage = useSharedValue(getPercentage(taskData));

  useEffect(() => {
    percentage.value = withTiming(getPercentage(taskData), {duration: 1000});
  }, [taskData]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `${Math.floor(percentage.value * 100)}%`,
    } as Partial<AnimateProps<TextInputProps>>;
  });

  return (
    <AnimatedText
      editable={false}
      value={`${Math.floor(percentage.value * 100)}%`}
      style={{
        width: '100%',
        fontSize: 30,
        color: getSelectedItem(userData.color),
        fontWeight: 'bold',
      }}
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedProgressText;
