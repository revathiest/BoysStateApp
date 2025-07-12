import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

test('displays Login Screen header', () => {
  const { getByRole } = render(<LoginScreen />);
  expect(getByRole('header').props.children).toBe('Login Screen');
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
      json: () => Promise.resolve({ colors: { primary: '#111', secondary: '#222' } }),
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
    branding: { colors: { primary: '#111', secondary: '#222' } },
  });
  delete global.__DEV__;
});
