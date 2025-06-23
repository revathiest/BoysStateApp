import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function getBaseUrl() {
  return __DEV__
    ? 'http://localhost:3000'
    : 'https://boysstateappservices.up.railway.app';
}

export default function HomeScreen() {
  const [apiStatus, setApiStatus] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${getBaseUrl()}/status`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setApiStatus(data.api || 'unknown');
        setDbStatus(data.db || 'unknown');
      })
      .catch(() => {
        if (!isMounted) return;
        setApiStatus('error');
        setDbStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container} testID="home-screen">
      <Text accessibilityRole="header">Home Screen</Text>
      <Text>API Status: {apiStatus || 'loading'}</Text>
      <Text>DB Status: {dbStatus || 'loading'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
});
