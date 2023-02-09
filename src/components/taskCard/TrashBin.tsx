import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  FadeInRight,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import CustomIcon from '../../utils/CustomIcon';
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const TrashBin = () => {
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
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        AnimatedOpacity,
      ]}
      entering={FadeInRight.duration(500)}
      exiting={FadeOutRight}
      onLayout={() =>
        ReactNativeHapticFeedback.trigger('impactLight', options)
      }>
      <CustomIcon name="delete" size={22} dir="Feather" />
    </Animated.View>
  );
};

export default TrashBin;
