import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

beforeEach(() => {
  fetch.mockReset();
  fetch.mockResolvedValue({ json: () => Promise.resolve({}) });
});

test('App navigates between screens', () => {
  const { getByText } = render(<App />);

  // initial screen
  expect(getByText('Home Screen')).toBeTruthy();

  fireEvent.press(getByText('Login'));
  expect(getByText('Login Screen')).toBeTruthy();

  fireEvent.press(getByText('Schedule'));
  expect(getByText('Schedule Screen')).toBeTruthy();

  fireEvent.press(getByText('Home'));
  expect(getByText('Home Screen')).toBeTruthy();
});
