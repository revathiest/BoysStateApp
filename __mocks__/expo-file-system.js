module.exports = {
  cacheDirectory: '/cache/',
  getInfoAsync: jest.fn(() => Promise.resolve({ exists: false })),
  makeDirectoryAsync: jest.fn(() => Promise.resolve()),
  downloadAsync: jest.fn((uri, dest) => Promise.resolve({ uri: dest })),
};
