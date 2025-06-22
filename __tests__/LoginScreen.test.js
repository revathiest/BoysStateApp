import { createElement } from 'react';
import LoginScreen from '../screens/LoginScreen.js';

test('LoginScreen renders', () => {
  const element = createElement(LoginScreen);
  expect(element.type).toBe(LoginScreen);
});
