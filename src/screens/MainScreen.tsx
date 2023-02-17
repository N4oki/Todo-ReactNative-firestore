import React from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Dimensions,
} from 'react-native';

import Navbar from '../components/navbar/Navbar';
import TaskCard from '../components/taskCard/TaskCard';
import TaskInput from '../components/taskInput/TaskInput';
import {useAppContext} from '../utils/context';
import Animated, {FadeIn, FadeOutUp, Layout} from 'react-native-reanimated';
import {getColorScheme} from '../utils/tools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const MainScreen = () => {
  const {taskData} = useAppContext();
  const colorScheme = getColorScheme().colorScheme;
  const Height =
    Dimensions.get('window').height - Dimensions.get('window').height * 0.3;

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
          <GestureHandlerRootView
            style={{height: Height}}
            testID="scrollRootView">
            {taskData.map(item => (
              <Animated.View
                key={item.id.toString()}
                entering={FadeIn.duration(500).delay(300)}
                layout={Layout.duration(300)}
                exiting={FadeOutUp.duration(300)}>
                <TaskCard task={item} />
              </Animated.View>
            ))}
          </GestureHandlerRootView>
        </ScrollView>

        <TaskInput />
      </KeyboardAvoidingView>
    </View>
  );
};

export default MainScreen;
