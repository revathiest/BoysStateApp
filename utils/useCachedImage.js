import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function useCachedImage(uri) {
  const [source, setSource] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!uri) {
        return;
      }
      try {
        const cacheFile = FileSystem.cacheDirectory + encodeURIComponent(uri);
        const info = await FileSystem.getInfoAsync(cacheFile);
        if (info.exists) {
          if (!cancelled) setSource({ uri: info.uri });
        } else {
          const download = await FileSystem.downloadAsync(uri, cacheFile);
          if (!cancelled) setSource({ uri: download.uri });
        }
      } catch {
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
