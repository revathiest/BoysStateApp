import { createElement } from 'react';
import ScheduleScreen from '../screens/ScheduleScreen.js';

test('ScheduleScreen renders', () => {
  const element = createElement(ScheduleScreen);
  expect(element.type).toBe(ScheduleScreen);
});
