require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

import '@testing-library/jest-native';

import 'react-native-gesture-handler/jestSetup.js';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-firebase/app', () => ({}));

jest.mock('@react-native-firebase/firestore', () => () => {
  return {
    collection: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        onSnapshot: jest.fn(),
      })),
    })),
  };
});

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
    FadeIn: {
      duration: () => ({
        delay: () => {},
      }),
    },

    FadeOutRight: {
      duration: () => {},
    },
    FadeOutUp: {
      duration: () => ({
        delay: () => {},
      }),
    },
    FadeInRight: {
      duration: () => {},
    },
  };
});
