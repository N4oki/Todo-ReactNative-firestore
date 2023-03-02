import {TaskData} from './context';
import {useColorScheme} from 'react-native';

export const getSelectedItem = (
  data: {
    item: string;
    isChecked: boolean;
  }[],
): string => {
  let selectedItem = data.filter(item => item.isChecked);
  if (selectedItem.length !== 1) {
    throw new Error('No selected item or multiple items chosen');
  }

  return selectedItem[0].item;
};

export const sortTaskArray = (array: TaskData[]) => {
  const done = array.filter(item => item.isDone === true);
  const unDone = array.filter(item => item.isDone === false);

  const sortedArray = unDone.concat(done);
  return sortedArray;
};

export const getPercentage = (array: TaskData[]): number => {
  const checkedTasks = array.filter(task => {
    if (task.isDone) return true;
    return false;
  }).length;

  const totalTasks = array.length;
  const percentage = checkedTasks / totalTasks;

  return percentage || 0;
};

export const getColorScheme = () => {
  const colorScheme = useColorScheme();

  let keyboardBg = colorScheme === 'dark' ? '#363636' : '#D0D4DA';
  let inputBg = colorScheme === 'dark' ? '#949696' : '#F1F5F9';
  let textColor = colorScheme === 'dark' ? '#E0E1E1' : '#000000';
  let navbarBg = colorScheme === 'dark' ? '#2B2B2B' : '#E2E2E2';

  return {
    colorScheme: colorScheme,
    colors: {keyboardBg, inputBg, textColor, navbarBg},
  };
};

export const generateUUID = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};
