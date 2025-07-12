import { getAssets, DEFAULT_ASSETS } from '../branding';

test('getAssets returns remote logo when url provided', () => {
  const branding = { logoUrl: 'https://example.com/logo.png' };
  const assets = getAssets(branding);
  expect(assets.logo).toEqual({ uri: 'https://example.com/logo.png' });
});

test('getAssets falls back to default logo when url invalid', () => {
  const assets = getAssets({ logoUrl: '' });
  expect(assets.logo).toBe(DEFAULT_ASSETS.logo);
});

test('getAssets falls back when url lacks protocol', () => {
  const assets = getAssets({ logoUrl: '/path/to/logo.png' });
  expect(assets.logo).toBe(DEFAULT_ASSETS.logo);
});
