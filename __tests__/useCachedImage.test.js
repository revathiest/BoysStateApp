import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Image } from 'react-native';
import useCachedImage from '../utils/useCachedImage';
import * as FileSystem from 'expo-file-system';

function Test({ uri }) {
  const source = useCachedImage(uri);
  return <Image source={source} testID="img" />;
}

afterEach(() => {
  jest.clearAllMocks();
});

test('uses cached file when it exists', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: true })
    .mockResolvedValueOnce({ exists: true, uri: '/cache/images/x' });
  const { getByTestId } = render(<Test uri="https://host/logo.png" />);
  await waitFor(() =>
    expect(getByTestId('img').props.source).toEqual({ uri: '/cache/images/x' })
  );
  expect(FileSystem.makeDirectoryAsync).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
});

test('downloads file when not cached and directory is created', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: false })
    .mockResolvedValueOnce({ exists: false });
  const { getByTestId } = render(<Test uri="https://host/logo.png" />);
  const target = '/cache/images/' + encodeURIComponent('https://host/logo.png');
  await waitFor(() =>
    expect(FileSystem.downloadAsync).toHaveBeenCalledWith('https://host/logo.png', target)
  );
  expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith('/cache/images/', { intermediates: true });
  await waitFor(() => expect(getByTestId('img').props.source).toEqual({ uri: target }));
});

test('logs error and returns null on failure', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: true })
    .mockResolvedValueOnce({ exists: false });
  FileSystem.downloadAsync.mockRejectedValueOnce(new Error('fail'));
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<Test uri="https://host/logo.png" />);
  await waitFor(() => expect(FileSystem.downloadAsync).toHaveBeenCalled());
  expect(errSpy).toHaveBeenCalled();
  errSpy.mockRestore();
});
