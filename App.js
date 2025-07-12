import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  const [currentScreen, setCurrentScreen] = useState('Home');
  const [loggedIn, setLoggedIn] = useState(false);
  const [program, setProgram] = useState(null);
  const [branding, setBranding] = useState(null);

  const handleLoginSuccess = ({ program: p, branding: b }) => {
    setLoggedIn(true);
    setProgram(p);
    setBranding(b);
    setCurrentScreen('Home');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setProgram(null);
    setBranding(null);
  };

  let ScreenComponent;
  if (currentScreen === 'Login') {
    ScreenComponent = (
      <LoginScreen onLoginSuccess={handleLoginSuccess} branding={branding} />
    );
  } else if (currentScreen === 'Schedule') {
    ScreenComponent = <ScheduleScreen />;
  } else {
    ScreenComponent = (
      <HomeScreen
        loggedIn={loggedIn}
        program={program}
        branding={branding}
        onPressLogin={() => setCurrentScreen('Login')}
        onLogout={handleLogout}
        onSchedule={() => setCurrentScreen('Schedule')}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop }]}>
      {ScreenComponent}
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
