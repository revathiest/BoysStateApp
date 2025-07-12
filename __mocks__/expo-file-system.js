module.exports = {
  cacheDirectory: '',
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: false })),
  downloadAsync: jest.fn((uri, dest) => Promise.resolve({ uri: dest })),
};
