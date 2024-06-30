// __mocks__/react-native-gesture-handler.js
export const gestureHandlerRootHOC = jest.fn();
export const Directions = {};
export const State = {};
export const GestureHandlerRootView = jest
  .fn()
  .mockImplementation(({ children }) => children);
