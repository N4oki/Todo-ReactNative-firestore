import React, {useState, useRef} from 'react';
import {Box, HStack} from 'native-base';
import {KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native';
import uuid from 'react-native-uuid';

import Animated, {Layout} from 'react-native-reanimated';
import {useAppContext} from '../../utils/context';
import {getColorScheme} from '../../utils/tools';
import AddButton from './AddButton';
import SendButton from './SendButton';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const InputContainer = Animated.createAnimatedComponent(HStack);

const TaskInput = () => {
  const {setTaskData} = useAppContext();
  const [taskValue, setTaskValue] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {keyboardBg, inputBg, textColor} = getColorScheme().colors;

  const letters = new RegExp(/[^ ]/);
  const valid = letters.test(taskValue) ? true : false;

  const onPress = (taskValue: string) => {
    if (!taskValue) return;

    setTaskData(prev => {
      const newItem = {
        id: uuid.v4(),
        title: taskValue,
        isDone: false,
      };
      return [newItem, ...prev];
    });
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
        <Box
          style={{
            backgroundColor: focus ? keyboardBg : 'transparent',
          }}>
          <InputContainer
            layout={Layout.duration(300).damping(15).springify()}
            rounded="lg"
            style={{
              backgroundColor: inputBg,
              width: focus ? '90%' : '70%',
              margin: 5,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {!focus && (
              <AddButton textColor={textColor} onPress={onAddButtonClick} />
            )}
            <AnimatedTextInput
              layout={Layout.duration(100).delay(100).damping(15).springify()}
              placeholder="Add your task"
              placeholderTextColor={textColor}
              onChangeText={taskValue => setTaskValue(taskValue)}
              defaultValue={taskValue}
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
          </InputContainer>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TaskInput;
