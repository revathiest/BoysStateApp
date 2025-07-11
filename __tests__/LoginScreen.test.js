import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

test('displays Login Screen header', () => {
  const { getByRole } = render(<LoginScreen />);
  expect(getByRole('header').props.children).toBe('Login Screen');
});

test('submits credentials to the API', async () => {
  global.__DEV__ = true;
  fetch.mockResolvedValueOnce({ json: () => Promise.resolve({ token: 't' }) });

  const { getByPlaceholderText, getByText, getByTestId } = render(<LoginScreen />);
  fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'pass');
  fireEvent.press(getByText('Login'));

  await waitFor(() => getByTestId('login-message'));

  expect(fetch.mock.calls[0][0]).toBe('http://192.168.1.171:3000/login');
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
    email: 'user@example.com',
    password: 'pass',
  });
  delete global.__DEV__;
});
