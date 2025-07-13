import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const CACHE_DIR = FileSystem.cacheDirectory + 'images/';

async function ensureDirectoryRecursive(dir) {
  let base = '';
  let path = dir;
  if (path.startsWith('file://')) {
    base = 'file://';
    path = path.slice(7);
  } else if (path.startsWith('/')) {
    base = '/';
    path = path.slice(1);
  }
  const parts = path.split('/').filter(Boolean);
  let current = base;
  for (const part of parts) {
    current += part + '/';
    try {
      const info = await FileSystem.getInfoAsync(current);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(current, { intermediates: true });
      }
    } catch (err) {
      await FileSystem.makeDirectoryAsync(current, { intermediates: true });
    }
  }
}

function sanitize(uri) {
  return encodeURIComponent(uri);
}

export default function useCachedImage(uri) {
  const [source, setSource] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!uri) {
        return;
      }
      try {
        const dir = CACHE_DIR;
        try {
          await ensureDirectoryRecursive(dir);
        } catch (err) {
          console.error('Failed to ensure cache directory', err);
        }

        const cacheFile = dir + sanitize(uri);
        const info = await FileSystem.getInfoAsync(cacheFile);
        if (info.exists) {
          if (!cancelled) setSource({ uri: info.uri });
        } else {
          const download = await FileSystem.downloadAsync(uri, cacheFile);
          if (!cancelled) setSource({ uri: download.uri });
        }
      } catch (err) {
        console.error('Failed to load remote image', err);
        if (!cancelled) setSource(null);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [uri]);

  return source;
}
