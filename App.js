import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
    <View style={styles.container} testID="app-root">
      <Current />
      <NavigationBar navigate={setScreen} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
