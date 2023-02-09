import {Text} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import {getSelectedItem} from '../../utils/tools';
import {useAppContext} from '../../utils/context';

const AnimatedIcon = () => {
  const {userData} = useAppContext();
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    translateY.value = withRepeat(withTiming(-5, {duration: 300}), 2, true);
  }, [userData.icon]);

  return (
    <Animated.View
      style={[
        {
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        animatedStyle,
      ]}>
      <Text style={{fontSize: 50, textAlign: 'center'}}>
        {getSelectedItem(userData.icon)}
      </Text>
    </Animated.View>
  );
};

export default AnimatedIcon;
