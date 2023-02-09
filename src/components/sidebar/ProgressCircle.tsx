import React, {useEffect} from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Svg, {Circle} from 'react-native-svg';
import {getSelectedItem, getPercentage} from '../../utils/tools';
import {useAppContext} from '../../utils/context';
import AnimatedIcon from './UserIcon';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface taskProps {
  size: number;
  strokeWidth: number;
}

const ProgressContainer = (props: taskProps) => {
  const {size, strokeWidth} = props;
  const {taskData, userData} = useAppContext();

  const viewBox = `0 0 ${size} ${size}`;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;

  const circleProgress = useSharedValue(0);

  useEffect(() => {
    circleProgress.value = withTiming(getPercentage(taskData), {
      duration: 1000,
    });
  }, [taskData]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - circleProgress.value),
  }));

  return (
    <Svg width={size} height={size} viewBox={viewBox}>
      <AnimatedIcon />

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="gray"
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth / 2}
        stroke={getSelectedItem(userData.color)}
        strokeDasharray={circumference}
        animatedProps={animatedProps}
        transform={`rotate (-90 ${size / 2} ${size / 2} )`}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ProgressContainer;
