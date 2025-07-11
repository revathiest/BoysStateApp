import React from 'react';
import { render } from '@testing-library/react-native';

test('renders home screen component', () => {
  const App = require('../App').default;
  const { getByTestId } = render(<App />);
  expect(getByTestId('program-name')).toBeTruthy();
});

test('renders correctly on android', () => {
  const rn = require('react-native');
  rn.Platform.OS = 'android';
  const App = require('../App').default;
  const { getByTestId } = render(<App />);
  expect(getByTestId('program-name')).toBeTruthy();
  rn.Platform.OS = 'ios';
});
