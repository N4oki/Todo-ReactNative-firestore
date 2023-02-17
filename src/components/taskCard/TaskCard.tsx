import React, {useMemo, useState} from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Dimensions, TouchableOpacity, UIManager} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import CheckBox from './CheckBox';
import TrashBin from './TrashBin';
import {
  getColorScheme,
  getSelectedItem,
  sortTaskArray,
} from '../../utils/tools';
import {useAppContext, taskData} from '../../utils/context';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const LIST_ITEM_HIGHT = 40;
const MARGIN = 10;
const THRESHOLD = -SCREEN_WIDTH * 0.1;

const TaskCard = ({task}: {task: taskData}) => {
  let {userData, taskData, setTaskData} = useAppContext();
  const [isOver, setIsOver] = useState(false);

  const opacity =
    task.isDone === true ? useSharedValue(0.7) : useSharedValue(1);
  const translateX = useSharedValue(1);

  const itemHeight = useSharedValue(LIST_ITEM_HIGHT);
  const marginY = useSharedValue(10);

  const {textColor} = getColorScheme().colors;

  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginY.value,
      opacity: opacity.value,
      transform: [{translateX: translateX.value}],
    };
  });

  const check = () => {
    if (!task.id) return;

    ReactNativeHapticFeedback.trigger('impactLight', options);
    opacity.value = withDelay(
      1000,
      withTiming(task.isDone === false ? 0.7 : 1),
    );

    setTaskData(prev => {
      const newData = prev.map(item => {
        if (item.id === task.id) {
          return {id: item.id, title: item.title, isDone: !item.isDone};
        }
        return item;
      });
      return sortTaskArray(newData);
    });
  };

  const gesture = useMemo(
    () =>
      Gesture.Pan()
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
            translateX.value = withTiming(
              -SCREEN_WIDTH / 2,
              {duration: 500},
              () => {
                runOnJS(setIsOver)(false);
              },
            );
            itemHeight.value = withDelay(750, withTiming(0));
            opacity.value = withDelay(750, withTiming(0));
            marginY.value = withDelay(
              750,
              withTiming(0, undefined, isFinished => {
                if (isFinished) {
                  const newData = taskData.filter(item => item.id !== task.id);
                  runOnJS(setTaskData)(newData);
                }
              }),
            );
          } else {
            translateX.value = withSpring(0);
            runOnJS(setIsOver)(false);
          }
        }),
    [taskData, setTaskData],
  );

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: LIST_ITEM_HIGHT,
            },
            rTaskContainerStyle,
          ]}>
          <TouchableOpacity onPress={() => check()} testID="pressableCheckBox">
            <CheckBox
              isChecked={task.isDone}
              boxFillColor={getSelectedItem(userData.color)}
              strokeColor="#f2fcfe"
              width={LIST_ITEM_HIGHT - MARGIN}
              height={LIST_ITEM_HIGHT - MARGIN}
              margin={1}
            />
          </TouchableOpacity>

          <Animated.Text
            style={[
              {
                fontSize: 25,
                height: LIST_ITEM_HIGHT - MARGIN,
                lineHeight: LIST_ITEM_HIGHT - MARGIN,
                width: SCREEN_WIDTH * 0.8,
                padding: 0,
                marginLeft: 2,
                color: textColor,
              },
              AnimatedOpacity,
            ]}>
            {task.title}
          </Animated.Text>
        </Animated.View>
      </GestureDetector>
      {isOver ? <TrashBin /> : null}
    </>
  );
};

export default TaskCard;
