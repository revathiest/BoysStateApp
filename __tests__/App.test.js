import { createElement } from 'react';
import App from '../App.js';

test('App renders root view', () => {
  const element = createElement(App);
  expect(element.type).toBe(App);
});
