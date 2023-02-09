import {NativeBaseProvider} from 'native-base';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {INITIAL_DATA} from '../data/constants';
import uuid from 'react-native-uuid';

export type taskData = {
  id: string | number[];
  title: string;
  isDone: boolean;
};

export type userData = {
  color: {item: string; isChecked: boolean}[];
  icon: {item: string; isChecked: boolean}[];
};
export interface appContextValue {
  userData: userData;
  setUserData: Dispatch<SetStateAction<userData>>;
  taskData: taskData[];
  setTaskData: Dispatch<SetStateAction<taskData[]>>;
}

const initialData = [
  {
    id: uuid.v4(),
    title: 'Edit video',
    isDone: false,
  },
];

const AppContext = createContext<appContextValue | undefined>(undefined);

export const AppWrapper = ({children}: {children: ReactNode}) => {
  const [taskData, setTaskData] = useState(initialData);
  const [userData, setUserData] = useState(INITIAL_DATA);

  let sharedState = {
    taskData,
    setTaskData,
    userData,
    setUserData,
  };
  return (
    <NativeBaseProvider>
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </NativeBaseProvider>
  );
};

export const useAppContext = () => {
  let context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext must be used inside of a AppWrapper, ' +
        'otherwise it will not function correctly.',
    );
  }
  return context;
};
