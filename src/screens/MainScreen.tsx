import React from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';

import Navbar from '../components/navbar/Navbar';
import TaskCard from '../components/taskCard/TaskCard';
import TaskInput from '../components/taskInput/TaskInput';
import {useAppContext} from '../utils/context';
import Animated, {FadeIn, Layout} from 'react-native-reanimated';
import {getColorScheme} from '../utils/tools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const MainScreen = () => {
  const {taskData} = useAppContext();
  const colorScheme = getColorScheme().colorScheme;
  const windowHeight = Dimensions.get('window').height;
  const scrollViewHeight = windowHeight * 0.7 - (StatusBar.currentHeight || 0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#2B2B2B' : '#E2E2E2',
      }}>
      <Navbar />

      <ScrollView>
        <GestureHandlerRootView
          style={{height: scrollViewHeight}}
          testID="scrollRootView">
          {taskData.map(item => (
            <Animated.View
              key={item.id.toString()}
              entering={FadeIn.duration(300)}
              layout={Layout.duration(300)}>
              <TaskCard task={item} />
            </Animated.View>
          ))}
        </GestureHandlerRootView>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TaskInput />
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainScreen;
