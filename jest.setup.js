jest.mock('react-native');
jest.mock('expo-status-bar');
jest.mock('expo-file-system');

global.fetch = jest.fn();
