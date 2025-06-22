import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

test('displays Login Screen header', () => {
  const { getByRole } = render(<LoginScreen />);
  expect(getByRole('header').props.children).toBe('Login Screen');
});
