import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationBar from '../components/NavigationBar';

test('calls navigate with correct screen names', () => {
  const navigate = jest.fn();
  const { getByText } = render(<NavigationBar navigate={navigate} />);

  fireEvent.press(getByText('Home'));
  fireEvent.press(getByText('Login'));
  fireEvent.press(getByText('Schedule'));

  expect(navigate).toHaveBeenCalledWith('Home');
  expect(navigate).toHaveBeenCalledWith('Login');
  expect(navigate).toHaveBeenCalledWith('Schedule');
});
