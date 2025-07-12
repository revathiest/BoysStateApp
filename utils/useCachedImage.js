import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const CACHE_DIR = FileSystem.cacheDirectory + 'images/';

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
          const dirInfo = await FileSystem.getInfoAsync(dir);
          if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
          }
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
