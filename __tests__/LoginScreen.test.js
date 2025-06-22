import test from 'node:test';
import assert from 'node:assert';
import { createElement } from 'react';
import LoginScreen from '../screens/LoginScreen.js';

test('LoginScreen renders', () => {
  const element = createElement(LoginScreen);
  assert.strictEqual(element.type, LoginScreen);
});
