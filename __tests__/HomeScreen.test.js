import test from 'node:test';
import assert from 'node:assert';
import { createElement } from 'react';
import HomeScreen from '../screens/HomeScreen.js';

test('HomeScreen renders', () => {
  const element = createElement(HomeScreen);
  assert.strictEqual(element.type, HomeScreen);
});
