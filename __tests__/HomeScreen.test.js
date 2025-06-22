import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

test('displays Home Screen header', () => {
  const { getByRole } = render(<HomeScreen />);
  expect(getByRole('header').props.children).toBe('Home Screen');
});
