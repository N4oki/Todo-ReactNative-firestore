import React, {useEffect} from 'react';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  interpolateColor,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {BOX_OUTLINE} from '../../data/constants';

const STROKE_LENGTH = 33;

const CHECKMARK_STROKE =
  'M7 14.1765C9.1 14.1765 13.2544 18.0709 13.8108 20C15.4 13.6471 21.7 5.17647 28 2';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedStroke = Animated.createAnimatedComponent(Path);

interface AnimatedStrokeProps {
  boxFillColor: string;
  strokeColor: string;
  isChecked: boolean;
  side?: boolean;
  width: number;
  height: number;
  margin: number;
}

const CheckBox = ({
  boxFillColor,
  strokeColor,
  isChecked,
  side,
  width,
  height,
  margin,
}: AnimatedStrokeProps) => {
  const checkBoxProgress = useSharedValue(0);

  useEffect(() => {
    checkBoxProgress.value = withDelay(
      500,
      withTiming(isChecked ? 1 : 0, {duration: 500}),
    );
  }, [isChecked]);

  const boxAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(
      checkBoxProgress.value,
      [0, 1],
      ['transparent', boxFillColor],
    ),
  }));

  const strokeAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: STROKE_LENGTH - STROKE_LENGTH * checkBoxProgress.value,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`-${margin} -${margin} ${30 + margin} ${30 + margin}`}>
      {side ? (
        <Path
          d={BOX_OUTLINE}
          stroke={boxFillColor}
          strokeWidth={2.5}
          fill={boxFillColor}
        />
      ) : (
        <AnimatedPath
          d={BOX_OUTLINE}
          stroke={boxFillColor}
          strokeWidth={2.5}
          animatedProps={boxAnimatedProps}
        />
      )}
      <AnimatedStroke
        d={CHECKMARK_STROKE}
        strokeDasharray={STROKE_LENGTH}
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animatedProps={strokeAnimatedProps}
      />
    </Svg>
  );
};

export default CheckBox;
