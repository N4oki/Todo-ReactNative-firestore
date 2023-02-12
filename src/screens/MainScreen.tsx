import React from 'react';
import {
  Platform,
  UIManager,
  ScrollView,
  KeyboardAvoidingView,
  View,
} from 'react-native';

import Navbar from '../components/navbar/Navbar';
import TaskCard from '../components/taskCard/TaskCard';
import TaskInput from '../components/taskInput/TaskInput';
import {useAppContext} from '../utils/context';
import Animated, {Layout} from 'react-native-reanimated';
import {getColorScheme} from '../utils/tools';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const MainScreen = () => {
  const {taskData} = useAppContext();
  const colorScheme = getColorScheme().colorScheme;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#2B2B2B' : '#E2E2E2',
      }}>
      <Navbar />
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          {taskData.map(item => (
            <Animated.View
              key={item.id.toString()}
              layout={Layout.duration(200).damping(5)}>
              <TaskCard task={item} />
            </Animated.View>
          ))}
        </ScrollView>

        <TaskInput />
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainScreen;
