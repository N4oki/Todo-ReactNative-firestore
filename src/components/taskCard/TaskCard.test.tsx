import React from 'react';
import TaskCard from './TaskCard';
import {AppWrapper} from '../../utils/context';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

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
  };
});

describe('Task card components', () => {
  it('should render title of task data and change text value when user changes it', async () => {
    let taskData = [{id: '1', title: 'test', isDone: false}];
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

    const {getByPlaceholderText} = render(
      <AppWrapper testValue={sharedState}>
        <TaskCard task={taskData[0]} />
      </AppWrapper>,
    );

    const taskTitleInput = getByPlaceholderText(/type your task/i);
    expect(taskTitleInput.props.value).toBe('test');

    fireEvent.changeText(taskTitleInput, 'hello world');
    expect(taskTitleInput.props.value).toBe('hello world');
  });
});
