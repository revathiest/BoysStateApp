import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen'; // or wherever your HomeScreen lives
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'transparent', // Let the HomeScreen's gradient go full-bleed
  },
});
