/**
 * @format
 */

import 'react-native';

import {
  getSelectedItem,
  sortTaskArray,
  getPercentage,
  getColorScheme,
} from './tools';
import {taskData} from './context';

const mockedUseColorScheme = jest.fn().mockReturnValue('dark');

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => {
  return {
    default: mockedUseColorScheme,
  };
});

describe('utils functions ', () => {
  const taskData = [
    {
      id: 'id1',
      title: 'should be 3rd',
      isDone: true,
      isEditMode: false,
      date: '2020' as unknown as Date,
    },
    {
      id: 'id2',
      title: 'should be 1st',
      isDone: false,
      isEditMode: false,
      date: '2021' as unknown as Date,
    },
    {
      id: 'id3',
      title: 'should be 2nd',
      isDone: false,
      isEditMode: false,
      date: '2022' as unknown as Date,
    },
  ];
  it('should get selected item from array', () => {
    const multipleItemsChosen = [
      {item: 'red', isChecked: false},
      {item: 'yellow', isChecked: true},
      {item: 'green', isChecked: true},
    ];

    const noItemsChosen = [
      {item: 'red', isChecked: false},
      {item: 'yellow', isChecked: false},
      {item: 'green', isChecked: false},
    ];

    expect(() => getSelectedItem(noItemsChosen)).toThrow(
      'No selected item or multiple items chosen',
    );

    expect(() => getSelectedItem(multipleItemsChosen)).toThrow(
      'No selected item or multiple items chosen',
    );

    const data = [
      {item: 'red', isChecked: false},
      {item: 'yellow', isChecked: true},
      {item: 'green', isChecked: false},
    ];

    const selectedItem = getSelectedItem(data);
    expect(selectedItem).toBe('yellow');
  });

  it('should sort task array, unchecked tasks should be beginning of the array', () => {
    expect(sortTaskArray(taskData)[0].title).toBe('should be 1st');
  });

  it('should get progress percentage from taskData', () => {
    const percentage = getPercentage(taskData);
    expect(percentage).toBe(0.3333333333333333);

    const noTask = [{}] as taskData[];

    expect(getPercentage(noTask)).toBe(0);
  });

  it('should return color scheme of user device and color object', () => {
    const color = getColorScheme();

    expect(color).toMatchObject({
      colorScheme: 'dark',
      colors: {
        keyboardBg: '#363636',
        inputBg: '#949696',
        textColor: '#E0E1E1',
        navbarBg: '#2B2B2B',
      },
    });
  });
});
