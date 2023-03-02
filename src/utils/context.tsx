import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Text, View} from 'react-native';
import {INITIAL_DATA} from '../data/constants';
import firestore from '@react-native-firebase/firestore';
import {sortTaskArray} from './tools';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface TaskData {
  id: string;
  title: string;
  isDone: boolean;
  date: number;
  isEditMode: boolean;
}

export type UserData = {
  color: {item: string; isChecked: boolean}[];
  icon: {item: string; isChecked: boolean}[];
};

interface AppContextValue {
  taskData: TaskData[];
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppWrapper = ({
  children,
  testValue,
}: {
  children: ReactNode;
  testValue?: AppContextValue;
}) => {
  const [userData, setUserData] = useState<UserData>(INITIAL_DATA);
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });

    const unsubscribe = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        if (!user) {
          setInitializing(false);
          return;
        }

        const ref = firestore()
          .collection('users')
          .doc(user.uid)
          .collection('todos')
          .orderBy('date', 'desc');

        const unsubscribe = ref.onSnapshot(querySnapshot => {
          const taskData = querySnapshot.docs.map(doc => {
            const {title, isDone, date, isEditMode} = doc.data();

            const data: TaskData = {
              id: doc.id,
              title,
              isDone,
              date,
              isEditMode,
            };

            return data;
          });

          setTaskData(sortTaskArray(taskData));
          setInitializing(false);
        });

        return () => {
          unsubscribe();
        };
      },
    );
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View
        style={{
          display: 'flex',
          minHeight: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  const sharedState = {
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
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext must be used inside of a AppWrapper, otherwise it will not function correctly.',
    );
  }

  return context;
};
