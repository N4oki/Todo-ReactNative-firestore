import React, {ReactNode} from 'react';

import renderer from 'react-test-renderer';
import Navbar from '../src/components/navbar/Navbar';
import TaskCard from '../src/components/taskCard/TaskCard';
import Test from '../src/components/Test';
import MainScreen from '../src/screens/MainScreen';
import {AppWrapper} from '../src/utils/context';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test('renders correctly', async () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  const taskData = {
    id: 'id',
    title: 'Edit video',
    isDone: false,
  };

  // function TestSafeAreaProvider({children}) {
  //   return (
  //     <NativeBaseProvider
  //       initialMetrics={{
  //         frame: {x: 0, y: 0, width: 0, height: 0},
  //         insets: {top: 0, left: 0, right: 0, bottom: 0},
  //       }}>
  //       {children}
  //     </NativeBaseProvider>
  //   );
  // }
  const tree = renderer
    .create(
      // <AppWrapper>
      //   <MainScreen />
      // </AppWrapper>,
      // <NativeBaseProvider
      //   initialWindowMetrics={{
      //     frame: {x: 0, y: 0, width: 0, height: 0},
      //     insets: {top: 0, left: 0, right: 0, bottom: 0},
      //   }}>
      //   <AppWrapper>
      //     <Navbar />
      //   </AppWrapper>
      // </NativeBaseProvider>,
      <Test />,
    )
    .toJSON();
});
