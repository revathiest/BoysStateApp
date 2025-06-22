import React from 'react';
import { render } from '@testing-library/react-native';
import ScheduleScreen from '../screens/ScheduleScreen';

test('displays Schedule Screen header', () => {
  const { getByRole } = render(<ScheduleScreen />);
  expect(getByRole('header').props.children).toBe('Schedule Screen');
});
