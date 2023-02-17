import React, {useState, useRef} from 'react';

import {
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';

import Animated, {Layout} from 'react-native-reanimated';
import {getColorScheme} from '../../utils/tools';
import AddButton from './AddButton';
import SendButton from './SendButton';
import firestore from '@react-native-firebase/firestore';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const TaskInput = () => {
  const ref = firestore().collection('todos');
  const [taskValue, setTaskValue] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {keyboardBg, inputBg, textColor} = getColorScheme().colors;

  const letters = new RegExp(/[^ ]/);
  const valid = letters.test(taskValue) ? true : false;

  const onPress = async (taskValue: string) => {
    if (!taskValue) return;
    const newData = {
      title: taskValue,
      id: uuid.v4(),
      isDone: false,
      date: new Date(),
    };

    await ref.add(newData);
    setTaskValue('');
  };

  const onAddButtonClick = () => {
    inputRef?.current?.focus();
  };

  return (
    <SafeAreaView style={{paddingRight: 1}}>
      <KeyboardAvoidingView
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
        behavior="position">
        <View
          style={{
            backgroundColor: focus ? keyboardBg : 'transparent',
          }}>
          <Animated.View
            layout={Layout.duration(300).damping(15).springify()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: inputBg,
              width: focus ? '90%' : '70%',
              margin: 5,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 10,
            }}>
            {!focus && (
              <AddButton textColor={textColor} onPress={onAddButtonClick} />
            )}
            <AnimatedTextInput
              layout={Layout.duration(100).damping(15).springify().delay(100)}
              placeholder="Add your task"
              placeholderTextColor={textColor}
              onChangeText={text => setTaskValue(text)}
              value={taskValue}
              ref={inputRef}
              style={{
                flex: 1,
                paddingLeft: focus ? 5 : 20,
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 18,
                color: textColor,
              }}
              onSubmitEditing={() => onPress(taskValue)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            {focus && valid && (
              <SendButton
                taskValue={taskValue}
                onPress={onPress}
                textColor={textColor}
              />
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TaskInput;
