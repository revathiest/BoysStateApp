import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

beforeEach(() => {
  fetch.mockReset();
  fetch.mockResolvedValue({ json: () => Promise.resolve({}) });
});

afterEach(() => {
  delete global.__DEV__;
});

test('displays Home Screen header', () => {
  global.__DEV__ = true;
  const { getByRole } = render(<HomeScreen />);
  expect(getByRole('header').props.children).toBe('Home Screen');
});

test('fetches status from localhost in dev', async () => {
  global.__DEV__ = true;
  fetch.mockResolvedValue({ json: () => Promise.resolve({ api: 'ok', db: 'ok' }) });
  const { getByText } = render(<HomeScreen />);

  await waitFor(() => expect(fetch).toHaveBeenCalledWith('http://localhost:3000/status'));
  await waitFor(() => getByText('API Status: ok'));
  await waitFor(() => getByText('DB Status: ok'));
});

test('fetches status from production api in prod', async () => {
  global.__DEV__ = false;
  fetch.mockResolvedValue({ json: () => Promise.resolve({ api: 'ok', db: 'ok' }) });
  const { getByText } = render(<HomeScreen />);

  await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://boysstateappservices.up.railway.app/status'));
  await waitFor(() => getByText('API Status: ok'));
  await waitFor(() => getByText('DB Status: ok'));
});
