import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Animated from 'react-native-reanimated';

const Test = () => {
  const [a, setA] = useState('a');
  return (
    <Animated.View>
      <Text>{a}</Text>
    </Animated.View>
  );
};

export default Test;
