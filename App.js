import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import NavigationBar from './components/NavigationBar';

export default function App() {
  const [screen, setScreen] = useState('Home');

  let Current = HomeScreen;
  if (screen === 'Login') Current = LoginScreen;
  else if (screen === 'Schedule') Current = ScheduleScreen;

  return (
    <SafeAreaView style={styles.container} testID="app-root">
      <NavigationBar navigate={setScreen} />
      <Current />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
