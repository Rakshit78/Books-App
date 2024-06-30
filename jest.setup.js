jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// jest.mock('react-native-gesture-handler', () =>
//   require('./__mocks__/react-native-gesture-handler')
// );
jest.mock('react-native-safe-area-context', () => {
  const SafeAreaContext = jest.requireActual('react-native-safe-area-context');
  return {
    ...SafeAreaContext,
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children({}),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: jest.fn(({ children }) => children),
  };
});
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn(() => {
      return {
        Navigator: jest.fn(({ children }) => children),
        Screen: jest.fn(({ children }) => children),
      };
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn(() => {
      return {
        Navigator: jest.fn(({ children }) => children),
        Screen: jest.fn(({ children }) => children),
      };
    }),
  };
});
