import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

test('displays Login Screen header', () => {
  const { getByRole } = render(<LoginScreen />);
  expect(getByRole('header').props.children).toBe('Login Screen');
});

test('calls onCancel when cancel pressed', () => {
  const onCancel = jest.fn();
  const { getByText } = render(<LoginScreen onCancel={onCancel} />);
  fireEvent.press(getByText('Cancel'));
  expect(onCancel).toHaveBeenCalled();
});

test('submits credentials and fetches branding', async () => {
  global.__DEV__ = true;
  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve({ token: 't' }) })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ programs: [{ programId: 'abc', programName: 'Test' }] }),
    })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({ colorPrimary: '#111', colorSecondary: '#222' }),
    });

  const onLoginSuccess = jest.fn();
  const { getByPlaceholderText, getByText, getByTestId } = render(
    <LoginScreen onLoginSuccess={onLoginSuccess} />
  );
  fireEvent.changeText(getByPlaceholderText('Email'), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'pass');
  fireEvent.press(getByText('Login'));

  await waitFor(() => getByTestId('login-message'));

  expect(fetch.mock.calls[0][0]).toBe('http://192.168.1.171:3000/login');
  expect(fetch.mock.calls[1][0]).toBe(
    'http://192.168.1.171:3000/user-programs/user@example.com'
  );
  expect(fetch.mock.calls[2][0]).toBe(
    'http://192.168.1.171:3000/api/branding-contact/abc'
  );
  expect(onLoginSuccess).toHaveBeenCalledWith({
    token: 't',
    program: { programId: 'abc', programName: 'Test' },
    branding: { colorPrimary: '#111', colorSecondary: '#222' },
  });
  delete global.__DEV__;
});

test('shows error message when login fails', async () => {
  global.__DEV__ = true;
  fetch.mockResolvedValueOnce({ json: () => Promise.resolve({}) });

  const { getByPlaceholderText, getByText, getByTestId } = render(
    <LoginScreen />
  );
  fireEvent.changeText(getByPlaceholderText('Email'), 'fail@example.com');
  fireEvent.changeText(getByPlaceholderText('Password'), 'pass');
  fireEvent.press(getByText('Login'));

  await waitFor(() => getByTestId('login-message'));

  expect(getByTestId('login-message').props.children).toBe('Login failed');
  delete global.__DEV__;
});
