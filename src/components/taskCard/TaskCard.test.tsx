import React from 'react';
import TaskCard from './TaskCard';
import {AppWrapper} from '../../utils/context';
import {render} from '@testing-library/react-native';

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

describe('Task card components', () => {
  it('should render title of task data and change text value when user changes it', async () => {
    let taskData = [
      {
        id: '1',
        title: 'test',
        isDone: false,
        isEditMode: false,
        date: '2002' as unknown as Date,
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

    const {getByText} = render(
      <AppWrapper testValue={sharedState}>
        <TaskCard task={taskData[0]} />
      </AppWrapper>,
    );

    const taskTitleText = getByText(/test/i);
    expect(taskTitleText.props.children).toBe('test');
  });
});
