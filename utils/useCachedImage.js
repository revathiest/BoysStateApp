import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const CACHE_DIR = FileSystem.cacheDirectory + 'images/';

function getCacheFile(uri) {
  // Use the last segment of the URL, or encode if not possible
  try {
    const fileName = uri.split('/').pop() || encodeURIComponent(uri);
    return CACHE_DIR + fileName;
  } catch {
    return CACHE_DIR + encodeURIComponent(uri);
  }
}

export default function useCachedImage(uri) {
  const [source, setSource] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!uri) return;
      try {
        // Ensure the cache directory exists
        const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
        }

        const cacheFile = getCacheFile(uri);

        // Check if cached file exists
        const info = await FileSystem.getInfoAsync(cacheFile);
        if (info.exists) {
          if (!cancelled) setSource({ uri: info.uri });
        } else {
          // Download and cache
          const download = await FileSystem.downloadAsync(uri, cacheFile);
          if (!cancelled) setSource({ uri: download.uri });
        }
      } catch (err) {
        console.error('Image caching error:', err);
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
