import test from 'node:test';
import assert from 'node:assert';
import { createElement } from 'react';
import ScheduleScreen from '../screens/ScheduleScreen.js';

test('ScheduleScreen renders', () => {
  const element = createElement(ScheduleScreen);
  assert.strictEqual(element.type, ScheduleScreen);
});
