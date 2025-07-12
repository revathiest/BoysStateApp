import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

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

test('navigates to login screen when login pressed', () => {
  const App = require('../App').default;
  const { getByText, getByTestId } = render(<App />);
  fireEvent.press(getByText('Login'));
  expect(getByTestId('login-screen')).toBeTruthy();
});

test('cancel from login returns to home screen', () => {
  const App = require('../App').default;
  const { getByText, getByTestId } = render(<App />);
  fireEvent.press(getByText('Login'));
  fireEvent.press(getByText('Cancel'));
  expect(getByTestId('program-name')).toBeTruthy();
});

test('applies branding data after successful login', async () => {
  global.__DEV__ = true;
  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve({ token: 't' }) })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ programs: [{ programId: 'p1', programName: 'Program One' }] }),
    })
    .mockResolvedValueOnce({ json: () => Promise.resolve({ logoUrl: 'https://logo.png' }) });

  const App = require('../App').default;
  const { getByText, getByPlaceholderText, getByLabelText } = render(<App />);
  fireEvent.press(getByText('Login'));
  fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'pass');
  fireEvent.press(getByText('Login'));

  await waitFor(() => {
    const src = getByLabelText('Boys State App Logo').props.source;
    expect(src.uri).toContain('logo.png');
  });
  delete global.__DEV__;
});
