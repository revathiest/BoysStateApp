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
  const target = '/cache/images/' + encodeURIComponent('https://host/logo.png');
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: true }) // /cache/
    .mockResolvedValueOnce({ exists: true }) // /cache/images/
    .mockResolvedValueOnce({ exists: true, uri: target }); // cache file
  const { getByTestId } = render(<Test uri="https://host/logo.png" />);
  await waitFor(() =>
    expect(getByTestId('img').props.source).toEqual({ uri: target })
  );
  expect(FileSystem.makeDirectoryAsync).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
});

test('downloads file when not cached and directory path created', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: false }) // /cache/
    .mockResolvedValueOnce({ exists: false }) // /cache/images/
    .mockResolvedValueOnce({ exists: false }); // cache file
  const { getByTestId } = render(<Test uri="https://host/logo.png" />);
  const target = '/cache/images/' + encodeURIComponent('https://host/logo.png');
  await waitFor(() =>
    expect(FileSystem.downloadAsync).toHaveBeenCalledWith('https://host/logo.png', target)
  );
  expect(FileSystem.makeDirectoryAsync).toHaveBeenNthCalledWith(1, '/cache/', { intermediates: true });
  expect(FileSystem.makeDirectoryAsync).toHaveBeenNthCalledWith(2, '/cache/images/', { intermediates: true });
  await waitFor(() => expect(getByTestId('img').props.source).toEqual({ uri: target }));
});

test('creates missing parent directories recursively', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: false }) // /cache/
    .mockResolvedValueOnce({ exists: false }) // /cache/images/
    .mockResolvedValueOnce({ exists: false }); // cache file
  render(<Test uri="https://host/logo.png" />);
  await waitFor(() => expect(FileSystem.makeDirectoryAsync).toHaveBeenCalled());
  expect(FileSystem.makeDirectoryAsync).toHaveBeenNthCalledWith(1, '/cache/', { intermediates: true });
  expect(FileSystem.makeDirectoryAsync).toHaveBeenNthCalledWith(2, '/cache/images/', { intermediates: true });
});

test('logs error and returns null on failure', async () => {
  FileSystem.getInfoAsync
    .mockResolvedValueOnce({ exists: true }) // /cache/
    .mockResolvedValueOnce({ exists: true }) // /cache/images/
    .mockResolvedValueOnce({ exists: false }); // cache file
  FileSystem.downloadAsync.mockRejectedValueOnce(new Error('fail'));
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<Test uri="https://host/logo.png" />);
  await waitFor(() => expect(FileSystem.downloadAsync).toHaveBeenCalled());
  expect(errSpy).toHaveBeenCalled();
  errSpy.mockRestore();
});
