import test from 'node:test';
import assert from 'node:assert';
import { createElement } from 'react';
import App from '../App.js';

test('App renders root view', () => {
  const element = createElement(App);
  assert.strictEqual(element.type, App);
});
