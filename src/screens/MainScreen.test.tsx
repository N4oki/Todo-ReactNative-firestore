import React from 'react';
import MainScreen from './MainScreen';
import {AppWrapper} from '../utils/context';
import {render, screen} from '@testing-library/react-native';

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  return {
    ...jest.requireActual('react-native-reanimated/mock'),
    ...jest.requireActual('react-native-reanimated/src/reanimated2/mock'),
    Layout: {
      duration: () => ({
        damping: () => ({
          springify: () => ({
            delay: () => {},
          }),
        }),
      }),
    },
    FadeIn: {
      duration: () => ({
        delay: () => {},
      }),
    },
    FadeOutUp: {
      duration: () => ({
        delay: () => {},
      }),
    },
  };
});

describe('Task card components', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders title of task and shows new title when value changes ', async () => {
    let taskData = [
      {id: '1', title: 'test1', isDone: false},
      {id: '2', title: 'test2', isDone: false},
      {id: '3', title: 'test3', isDone: false},
    ];
    const userData = {
      color: [
        {item: '#434343', isChecked: true},
        {item: '#203A43', isChecked: false},
        {item: '#8e9eab', isChecked: false},
      ],
      icon: [
        {item: '🐶', isChecked: true},
        {item: '🐱', isChecked: false},
        {item: '🐭', isChecked: false},
      ],
    };

    let sharedState = {
      taskData,
      setTaskData: jest.fn(),
      userData,
      setUserData: jest.fn(),
    };
    const {getByTestId, getByPlaceholderText, getByRole} = render(
      <AppWrapper testValue={sharedState}>
        <MainScreen />
      </AppWrapper>,
    );

    const root = getByTestId(/scrollRootView/i);
    expect(root.children.length).toBe(3);
  });
});
