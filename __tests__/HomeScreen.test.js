import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

beforeEach(() => {
  fetch.mockReset();
});

afterEach(() => {
  delete global.__DEV__;
});

test('login fetches program and branding in dev', async () => {
  global.__DEV__ = true;
  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve({ token: 't' }) })
    .mockResolvedValueOnce({
      json: () => Promise.resolve({ programs: [{ programId: 'abc', programName: 'Test Program' }] }),
    })
    .mockResolvedValueOnce({ json: () => Promise.resolve({ colors: { primary: '#111', secondary: '#222' } }) });

  const { getByText, getByTestId } = render(<HomeScreen />);
  fireEvent.press(getByText('Login'));

  await waitFor(() => getByTestId('assigned-program'));

  expect(fetch.mock.calls[0][0]).toBe('http://192.168.1.171:3000/login');
  expect(fetch.mock.calls[1][0]).toBe('http://192.168.1.171:3000/user-programs/demo@example.com');
  expect(fetch.mock.calls[2][0]).toBe('http://192.168.1.171:3000/api/branding-contact/abc');
  expect(getByTestId('program-name').props.children).toContain('Test Program');
});

test('shows welcome message when logged out', () => {
  global.__DEV__ = true;
  const { getByText } = render(<HomeScreen />);
  expect(getByText("Log in to get started! You'll see your schedule and updates once you're signed in.")).toBeTruthy();
});

test('logout clears program info', async () => {
  global.__DEV__ = true;
  fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve({ token: 't' }) })
    .mockResolvedValueOnce({
      json: () => Promise.resolve({ programs: [{ programId: 'abc', programName: 'Test Program' }] }),
    })
    .mockResolvedValueOnce({ json: () => Promise.resolve({ colors: {} }) });

  const { getByText, queryByTestId } = render(<HomeScreen />);
  fireEvent.press(getByText('Login'));
  await waitFor(() => getByText('Logout'));
  fireEvent.press(getByText('Logout'));

  expect(queryByTestId('assigned-program')).toBeNull();
});
