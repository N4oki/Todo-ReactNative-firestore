import React from 'react';
import Navbar from './Navbar';
import {AppWrapper} from '../../utils/context';
import {act, render, screen, waitFor} from '@testing-library/react-native';

describe('Navbar components', () => {
  it('renders Navbar ', async () => {
    let taskData = [
      {id: '1', title: 'test', isDone: false, date: 2020, isEditMode: false},
      {id: '2', title: 'test', isDone: true, date: 2021, isEditMode: false},
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

    const {getByTestId} = render(
      <AppWrapper testValue={sharedState}>
        <Navbar />
      </AppWrapper>,
    );

    const AnimatedProgressText = getByTestId(/animatedText/i);
    expect(AnimatedProgressText.props.value).toBe('50%');
    expect(AnimatedProgressText.props.style.color).toBe('#434343');
    expect(screen.getByText(/completed/i)).toBeTruthy();
  });
});
