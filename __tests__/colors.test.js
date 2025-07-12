import { lighten } from '../utils/colors';

test('lighten increases brightness by percent', () => {
  expect(lighten('#000000', 50)).toBe('#7f7f7f');
  expect(lighten('#204080', 45)).toBe('#93b3f3');
});
