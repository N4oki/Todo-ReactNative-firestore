import React, {useState} from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {HStack, Input, useColorMode} from 'native-base';
import {Dimensions, TouchableOpacity, useColorScheme} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import CheckBox from './CheckBox';
import TrashIcon from './TrashBin';

import {getColorScheme, getSelectedItem} from '../../utils/tools';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import {useAppContext, taskData} from '../../utils/context';
import TrashBin from './TrashBin';

const SCREEN_WIDTH = Dimensions.get('window').width;
const THRESHOLD = -SCREEN_WIDTH * 0.1;
const LIST_ITEM_HIGHT = 40;

const TaskCard = ({task}: {task: taskData}) => {
  let {userData, taskData, setTaskData} = useAppContext();
  const [isOver, setIsOver] = useState(false);
  const [checked, setChecked] = useState(false);
  const [taskValue, setTaskValue] = useState(task.title);

  const progress = useSharedValue(0);
  const textTranslateX = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HIGHT);
  const marginY = useSharedValue(10);

  const toggleItemState = (data: taskData[]) => {
    const done = data.filter(item => item.isDone === true);
    const unDone = data.filter(item => item.isDone === false);
    const sortedArray = unDone.concat(done);

    setTaskData(sortedArray);
  };

  const gesture = Gesture.Pan()
    .failOffsetY([-5, 5])
    .activeOffsetX([-5, 5])
    .onUpdate(event => {
      const isRightSwipe = event.translationX > -1;
      if (isRightSwipe) return;

      translateX.value = event.translationX;

      const shouldBeIsOver = translateX.value < THRESHOLD && !isOver;
      if (shouldBeIsOver) {
        runOnJS(setIsOver)(true);
      }
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < THRESHOLD;
      if (shouldBeDismissed && task.id) {
        translateX.value = withTiming(-SCREEN_WIDTH / 2);
        opacity.value = withTiming(0);
        marginY.value = withDelay(300, withTiming(0));
        itemHeight.value = withDelay(
          300,
          withTiming(0, undefined, isFinished => {
            if (isFinished) {
              const newData = taskData.filter(item => item.id !== task.id);

              runOnJS(toggleItemState)(newData);
            }
          }),
        );
      } else {
        translateX.value = withSpring(0);
        runOnJS(setIsOver)(false);
      }
    });

  const moveXStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const translateXStyle = useAnimatedStyle(() => ({
    transform: [{translateX: textTranslateX.value}],
  }));

  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginY.value,
      opacity: opacity.value,
    };
  });

  const check = () => {
    if (!task.id) return;

    setChecked(prev => {
      return !prev;
    });
    ReactNativeHapticFeedback.trigger('impactLight', options);

    progress.value = withDelay(
      500,
      withTiming(checked ? 1 : 0, {duration: 500}, isFinished => {
        if (isFinished) {
          textTranslateX.value = withSequence(
            withTiming(checked ? 0 : -3),
            withSpring(0),
          );
          opacity.value = withDelay(
            500,
            withTiming(checked ? 1 : 0.7, {duration: 500}),
          );
        }

        const newData = taskData.map(item => {
          if (item.id === task.id) {
            return {id: item.id, title: item.title, isDone: !item.isDone};
          }
          return item;
        });

        const done = newData.filter(item => item.isDone === true);
        const unDone = newData.filter(item => item.isDone === false);

        const sortedArray = unDone.concat(done);

        runOnJS(setTaskData)(sortedArray);
      }),
    );
  };

  const {textColor} = getColorScheme().colors;

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 20,
          height: LIST_ITEM_HIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        rTaskContainerStyle,
      ]}>
      {isOver ? <TrashIcon /> : null}

      <GestureDetector gesture={gesture}>
        <Animated.View style={moveXStyle}>
          <HStack>
            <TouchableOpacity onPress={check}>
              <CheckBox
                isChecked={checked}
                boxFillColor={getSelectedItem(userData.color)}
                strokeColor="#f2fcfe"
                width={30}
                height={30}
                margin={1}
              />
            </TouchableOpacity>
            <Animated.View style={[AnimatedOpacity, translateXStyle]}>
              <Input
                fontSize={25}
                placeholder="Type your task"
                placeholderTextColor={textColor}
                value={taskValue}
                width={SCREEN_WIDTH * 0.8}
                variant="unstyled"
                onChangeText={text => setTaskValue(text)}
                padding="0"
                marginLeft={2}
                color={textColor}
              />
            </Animated.View>
          </HStack>
        </Animated.View>
      </GestureDetector>
      {isOver ? <TrashBin /> : null}
    </Animated.View>
  );
};

export default TaskCard;
