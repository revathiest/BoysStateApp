import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen'; // or wherever your HomeScreen lives
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  return (
    <SafeAreaView style={[styles.container, { paddingTop }]}>\
      <HomeScreen />
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Let the HomeScreen's gradient go full-bleed
  },
});
