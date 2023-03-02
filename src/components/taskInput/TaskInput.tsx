import React, {useState, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import Animated, {Layout} from 'react-native-reanimated';
import {generateUUID, getColorScheme} from '../../utils/tools';
import AddButton from './AddButton';
import SendButton from './SendButton';
import {TaskData, useAppContext} from '../../utils/context';
import {updater} from '../../utils/firestoreUpdater';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const TaskInput = () => {
  const {taskData} = useAppContext();
  const [taskValue, setTaskValue] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);
  let editModeTask = taskData.find(item => item.isEditMode);
  const {keyboardBg, inputBg, textColor} = getColorScheme().colors;

  const letters = new RegExp(/[^ ]/);
  const valid = letters.test(taskValue) ? true : false;

  const onPress = async (
    taskValue: string,
    editModeTask: TaskData | undefined,
  ) => {
    if (!taskValue) return;

    const newData = {
      title: taskValue,
      id: generateUUID(),
      isDone: false,
      date: Date.now(),
      isEditMode: false,
    };

    try {
      updater({
        id: undefined,
        key: 'addEdit',
        newData: newData,
        editModeTask: editModeTask,
      });
      setTaskValue('');
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
    }
  };

  const onAddButtonClick = () => {
    inputRef?.current?.focus();
  };

  useEffect(() => {
    if (editModeTask) {
      inputRef?.current?.focus();
    }
  }, [editModeTask]);

  const onBlur = async (task: TaskData | undefined) => {
    setFocus(false);
    if (!task) return;
    updater({
      key: 'toggleEditMode',
      id: task.id,
      editModeTask: editModeTask,
    });
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
              placeholder={editModeTask ? 'Edit your task' : 'Add your task'}
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
              onSubmitEditing={() => onPress(taskValue, editModeTask)}
              onFocus={() => setFocus(true)}
              onBlur={() => onBlur(editModeTask)}
            />
            {focus && valid && (
              <SendButton
                taskValue={taskValue}
                editModeTask={editModeTask}
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
