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

test('schedule button triggers callback', () => {
  const onSchedule = jest.fn();
  const { getByText } = render(
    <HomeScreen loggedIn program={program} onSchedule={onSchedule} />
  );
  fireEvent.press(getByText('Schedule'));
  expect(onSchedule).toHaveBeenCalled();
});

test('shows program ID when provided', () => {
  const { getByTestId } = render(
    <HomeScreen loggedIn program={program} />
  );
  expect(getByTestId('assigned-program').props.children).toBe(
    `Program ID: ${program.programId}`
  );
});

test('uses cached branding logo when available', () => {
  jest.resetModules();
  jest.doMock('../utils/useCachedImage', () => jest.fn(() => ({ uri: 'cached.png' })));
  const Home = require('../screens/HomeScreen').default;
  const { getByLabelText } = render(<Home branding={{ logoUrl: 'https://x/logo.png' }} />);
  expect(getByLabelText('Boys State App Logo').props.source).toEqual({ uri: 'cached.png' });
});

test('falls back to default logo when cache missing', () => {
  jest.resetModules();
  jest.doMock('../utils/useCachedImage', () => jest.fn(() => null));
  const { DEFAULT_ASSETS } = require('../branding');
  const Home = require('../screens/HomeScreen').default;
  const { getByLabelText } = render(<Home branding={{ logoUrl: 'https://x/logo.png' }} />);
  expect(getByLabelText('Boys State App Logo').props.source).toBe(DEFAULT_ASSETS.logo);
});

test('uses default logo when no branding supplied', () => {
  jest.resetModules();
  const { DEFAULT_ASSETS } = require('../branding');
  const Home = require('../screens/HomeScreen').default;
  const { getByLabelText } = render(<Home />);
  expect(getByLabelText('Boys State App Logo').props.source).toBe(DEFAULT_ASSETS.logo);
});
