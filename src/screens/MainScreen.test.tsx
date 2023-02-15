import React, {createContext} from 'react';
import renderer from 'react-test-renderer';
import AnimatedProgressText from '../components/navbar/AnimatedProgressText';
import Navbar from '../components/navbar/Navbar';
import TaskCard from '../components/taskCard/TaskCard';
import MainScreen from './MainScreen';
import {AppWrapper} from '../utils/context';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react-native';
import CheckBox from '../components/taskCard/CheckBox';
// import '@testing-library/jest-native/extend-expect'

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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders title of task and shows new title when value changes ', async () => {
    const {getByTestId, getByPlaceholderText} = render(
      <AppWrapper>
        <MainScreen />
      </AppWrapper>,
    );

    const taskTitleInput = getByPlaceholderText(/type your task/i);

    const checkBox = getByTestId(/pressableCheckBox/i);

    expect(taskTitleInput.props.value).toBe('Edit video');

    expect(checkBox.findByProps({isChecked: false})).toBeTruthy();
    fireEvent.changeText(taskTitleInput, 'hello world');
    fireEvent.press(checkBox);
    // screen.debug();

    expect(taskTitleInput.props.value).toBe('hello world');
    expect(screen.getAllByPlaceholderText(/type your task/i).length).toBe(1);
  });
});
