import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

const program = { programId: 'abc', programName: 'Test Program' };

test('calls onPressLogin when login button pressed', () => {
  const onPressLogin = jest.fn();
  const { getByText } = render(<HomeScreen onPressLogin={onPressLogin} />);
  fireEvent.press(getByText('Login'));
  expect(onPressLogin).toHaveBeenCalled();
});

test('shows welcome message when logged out', () => {
  const { getByText } = render(<HomeScreen />);
  expect(
    getByText("Log in to get started! You'll see your schedule and updates once you're signed in.")
  ).toBeTruthy();
});

test('logout button triggers callback', () => {
  const onLogout = jest.fn();
  const { getByText } = render(
    <HomeScreen loggedIn program={program} onLogout={onLogout} />
  );
  fireEvent.press(getByText('Logout'));
  expect(onLogout).toHaveBeenCalled();
});
