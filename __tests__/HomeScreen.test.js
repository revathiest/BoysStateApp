import { createElement } from 'react';
import HomeScreen from '../screens/HomeScreen.js';

test('HomeScreen renders', () => {
  const element = createElement(HomeScreen);
  expect(element.type).toBe(HomeScreen);
});
