import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {INITIAL_DATA} from '../data/constants';
import firestore from '@react-native-firebase/firestore';
import {sortTaskArray} from './tools';

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
  taskData: taskData[];
  userData: userData;
  setUserData: Dispatch<SetStateAction<userData>>;
}

const AppContext = createContext<appContextValue | undefined>(undefined);

export const AppWrapper = ({
  children,
  testValue,
}: {
  children: ReactNode;
  testValue?: appContextValue;
}) => {
  const [userData, setUserData] = useState(INITIAL_DATA);
  const [taskData, setTaskData] = useState<taskData[]>([]);

  const ref = firestore().collection('todos').orderBy('date', 'desc');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const taskData = querySnapshot.docs.map(item => {
        const {title, isDone, date} = item.data();
        return {id: item.id, title, isDone, date};
      });

      setTaskData(sortTaskArray(taskData));
    });
  }, []);

  let sharedState = {
    taskData,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={testValue || sharedState}>
      {children}
    </AppContext.Provider>
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
