import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import NavigationBar from './components/NavigationBar';

// THEME COLORS
const COLORS = {
  background: '#F7F9FC',           // soft off-white
  primary: '#204080',              // navy blue (customize to match your branding!)
  card: '#FFFFFF',
  accent: '#FFA500',               // orange for highlights/buttons
  text: '#22223B',
  nav: '#204080',                  // match primary for nav bar
};

export default function App() {
  const [screen, setScreen] = useState('Home');
  let Current = HomeScreen;
  if (screen === 'Login') Current = LoginScreen;
  else if (screen === 'Schedule') Current = ScheduleScreen;

  return (
    <SafeAreaView style={styles.container} testID="app-root">
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <NavigationBar navigate={setScreen} />
      </View>
      {/* Main Content */}
      <View style={styles.content}>
        <Current />
      </View>
      {/* Status Bar */}
      <ExpoStatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navBar: {
    backgroundColor: COLORS.nav,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
