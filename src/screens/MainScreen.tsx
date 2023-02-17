import React, {useEffect, useState} from 'react';
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
import {taskData} from '../utils/context';
import Animated, {FadeIn, Layout} from 'react-native-reanimated';
import {getColorScheme} from '../utils/tools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const MainScreen = () => {
  const [taskData, setTaskData] = useState<taskData[]>([]);
  const ref = firestore().collection('todos');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const taskData = querySnapshot.docs.map(item => {
        const {title, isDone} = item.data();
        return {id: item.id, title, isDone};
      });
      setTaskData(taskData);
    });
  }, []);

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
            {taskData.map((item, index) => (
              <Animated.View
                key={item.id.toString()}
                entering={FadeIn.duration(500).delay(300)}
                layout={Layout.duration(500 + index * 100)}>
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
