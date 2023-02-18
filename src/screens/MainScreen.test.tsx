import React from 'react';
import MainScreen from './MainScreen';
import {AppWrapper} from '../utils/context';
import {render} from '@testing-library/react-native';

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

describe('Main　screen', () => {
  it('renders title of task and shows new title when value changes ', async () => {
    let taskData = [
      {
        id: '1',
        title: 'test1',
        isDone: false,
        isEditMode: false,
        date: '2020' as unknown as Date,
      },
      {
        id: '2',
        title: 'test2',
        isDone: false,
        isEditMode: false,
        date: '2021' as unknown as Date,
      },
      {
        id: '3',
        title: 'test3',
        isDone: false,
        isEditMode: false,
        date: '2022' as unknown as Date,
      },
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
